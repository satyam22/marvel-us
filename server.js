let express = require('express');
let app = express();

let http = require('http').Server(app);
let io = require('socket.io')(http);

let MongoClient = require('mongodb').MongoClient;
let path = require('path');
let bodyParser = require('body-parser');

let db;
let remote_db_connection = "mongodb://root:satyam123@ds141786.mlab.com:41786/marvelus";
let local_db_connection="mongodb://localhost:27017/marvelus";
var api = require('./server/routes/api');



app.use(bodyParser.json());
app.use(bodyParser({ urlEncoded: false }));

// MongoClient.connect(remote_db_connection, (err, database) => {
//     if(err){
//         MongoClient.connect(local_db_connection,(err,database)=>{
//             if(err){
//                 console.log("failed to connect to local database:");
//                 throw err;
//             }
//             db=database;               
//         })
//     }
//     db = database;
//     app.listen(3007, () => {
//         console.log("app is listening at port 3007");
//     })

// })
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
})
app.use('/api', api);
MongoClient.connect(local_db_connection,function(err,database){
    if(err){
        console.log("error occured while connecting to database");
    }
    else{
        db=database.db('marvelus');
        app.listen(3007,()=>{
            console.log("app is listening at port 3007");
        })
    }
})
app.use(express.static(path.join(__dirname, 'public')));



app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
})

io.on('connection', (socket) => {
    console.log("User connected");
    socket.on('disconnect', () => {
        console.log("User disconnected");
    })
    socket.on('add-message', (message) => {
        console.log("========inside server add message====="+message);
        io.emit('new-message', message);
        dataStorage(message);
    })

})
function dataStorage(message) {
    console.log("=======message reached======"+message);
    let storeData = { chatMessage: message, timestamp: new Date().getTime() };
    console.log("store data"+JSON.stringify(storeData));
    db.collection('chatroom-chat').save(storeData, (err, data) => {
        if (err) {
            console.log("error occured while saving data to database");
            console.log(err);
        }
        console.log("data saved successfully");
    })
    db.collection('chatroom-chat').find({},(err,data)=>{
        console.log("database data");
        console.log(data);
    })
}
let port = 5000;
http.listen(port, function () {
    console.log("app is listening at port: " + port);
})