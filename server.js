let express = require("express");
let app = express();
let server = require("http").Server(app);
let io = require("socket.io").listen(server);
let mongoose = require("mongoose");
let path = require("path");
let bodyParser = require("body-parser");
let logger = require("./logger");

let db;
let remote_db_connection =
  "mongodb://root:satyam123@ds141786.mlab.com:41786/marvelus";
let local_db_connection = "mongodb://localhost:27017/marvelus";
var api = require("./server/routes/api");
var Room = require("./server/models/room");

mongoose.connect(local_db_connection, { useMongoClient: true });
mongoose.connection.on("error", function(error) {
  if (error) throw error;
});

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser({ urlEncoded: false }));

var allowedOrigins = "http://localhost:3000";

app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", allowedOrigins);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

app.use("/api", api);
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

let ioEvents = function(io) {
  logger.info("inside function ioevents");
  io.on("connection", function(socket) {
    logger.info("socket io connection event");
    socket.on("createRoom", function(title) {
      logger.info("socket io create room event");
      Room.findOne({ title: new RegExp("^" + title + "$", "i") }, function(
        err,
        room
      ) {
        if (err) {
          logger.info("error occured in create room" + err);
          throw err;
        }
        if (room) {
          socket.emit("updateRoomsList", {
            error: "Error: Room title already exists"
          });
        } else {
          Room.create({ title: title }, function(err, newRoom) {
            if (err) {
              console.log("error occured");
              console.log(err.toString());
            }
            socket.emit("updateRoomsList", newRoom);
            socket.broadcast.emit("updateRoomsList", newRoom);
          });
        }
      });
    });
    socket.on("join user", function(data) {
      logger.info("socket io join user event");
      Room.findOne({ title: data.room }, function(err, room) {
        if (err) throw err;
        if (!room) {
          socket.emit("updateUsersList", { error: "Room doesn't exist" });
        } else {
          Room.addUser(room, data.name, socket, function(err, newRoom) {
            if (err) {
              logger.info("error occured while adding users");
              logger.info(err.toString());
              throw err;
            }
            socket.join(newRoom.id);
            Room.getUsers(newRoom, data.name, function(err, users) {
              logger.info("users in room" + users);
              socket.emit("updateUsersList", users);
            });
          });
        }
      });
    });

    socket.on("disconnect", function() {
      Room.removeUser(socket, function(err, room, userId, cuntUserInRoom) {
        if (err) throw err;
        socket.leave(room.id);
        if (cuntUserInRoom === 1) {
          socket.broadcast.to(room.id).emit("removeUser", userId);
        }
      });
    });

    socket.on("newMessage", function(roomName, message) {
      console.log(
        "====inside send message====" + roomName + "::message::" + message
      );
      Room.findOne({ title: roomName }, function(err, room) {
        if (err) throw err;
        console.log("inside find");
        io.in(room.id).emit("addMessage", message);
      });
    });
    socket.on("user is typing", function(userName, roomName) {
      //console.log("====inside send message====" + roomName + "::message::" + message);
      Room.findOne({ title: roomName }, function(err, room) {
        if (err) throw err;
        console.log("inside user typing");
        io.to(room.id).emit("user is typing",userName);
      });
    });
    socket.on("user stopped typing", function(userName, roomName) {
      //console.log("====inside send message====" + roomName + "::message::" + message);
      Room.findOne({ title: roomName }, function(err, room) {
        if (err) throw err;
        console.log("inside user typing");
        io.to(room.id).emit("user stopped typing");
      });
    });
  });
};

ioEvents(io);
function dataStorage(message) {
  console.log("=======message reached======" + message);
  let storeData = { chatMessage: message, timestamp: new Date().getTime() };
  console.log("store data" + JSON.stringify(storeData));
  db.collection("chatroom-chat").save(storeData, (err, data) => {
    if (err) {
      console.log("error occured while saving data to database");
      console.log(err);
    }
    console.log("data saved successfully");
  });
  db.collection("chatroom-chat").find({}, (err, data) => {
    console.log("database data");
    console.log(data);
  });
}

let port = 5000;
server.listen(port, function() {
  console.log("app is listening at port: " + port);
});
