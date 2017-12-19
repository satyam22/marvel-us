let roomModel = require('./../schema/room');
let User = require('./../models/user');


let create = function (data, callback) {
    let newRoom = new roomModel(data);
    newRoom.save(data, callback);
}

let find = function (data, callback) {
    roomModel.find(data, callback);
}

let findOne = function (data, callback) {
    roomModel.findOne(data, callback);
}

let deleteRoom=function (data, callback) {
    if(data){
        roomModel.remove({ title: data }, callback);        
    }
    else{
        console.log("inside delete room");
        roomModel.remove({},callback);
    }
}

let findById = function (id, callback) {
    roomModel.findById(id, callback);
}

let addUser = function (room, userId, socket, callback) {
    let conn = { userId: userId, socketId: socket.id };
    room.connections.push(conn);
    room.save(callback);
}
let getUsers = function (room, userId, callback) {
    console.log("inside getUsers function");
    let users = [];
    let vis = [];

    room.connections.forEach(function (conn) {
        if (!vis[conn.userId]) {
            users.push(conn.userId);
        }
        vis[conn.userId] = true;
    });
    users.forEach(function (userId, i) {
        User.findOne({ title: userId }, function (err, user) {
            if (err) {
                return callback(err);
            }
            users[i] = user;
        })
    })
    console.log("====users=====");
    console.log(users);
    callback(null, users);
}
let removeUser = function (socket, callback) {
    let userId = socket.userId;
    find({}, function (err, rooms) {
        if (err) {
            return callback(err);
        }
        rooms.every(function (room) {
            let pass = true;
            let cunt = 0, target = 0;
            room.connections.forEach(function (conn, i) {
                if (conn.userId === userId) {
                    cunt++;
                }
                if (conn.socketId === socket.id) {
                    pass = false;
                    target = i;
                }
            });
            if (!pass) {
                //   room.connections.id(room/connections[target]._id).remove();
                room.save(function (err) {
                    callback(err, room, userId, cunt);
                });
            }
            return pass;
        });
    });
}
module.exports = {
    create, find, findOne, findById, getUsers, removeUser, addUser, deleteRoom
}