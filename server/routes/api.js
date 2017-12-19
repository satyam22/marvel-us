var express = require('express');
var router = express.Router();
var Room = require('./../models/room');
var heroes = require('./../jsondata/heroes.json');
var dummyData = {
    "name": "satyam",
    "city": "nagpur"
};

var test = { "result": ["test1", "test2"] };
router.get('/', function (req, res) {
    res.send("Api server is running");
})

router.get("/test", function (req, res) {
    res.json(test);
});
router.get('/heroes', function (req, res) {
    res.json(heroes);
});
router.get('/rooms', function (req, res) {
    Room.find(function (err, rooms) {
        rooms = rooms.map(room => room.title);
        if (err) throw err;
        res.json(rooms);
    })
});
router.get('/rooms/:roomName/:currentUser', function (req, res) {
    console.log("request params");
    console.log(req.params);
    //let dummyData = ["shivam", "piyush"];
    Room.findOne({ title: req.params.roomName }, function (err, room) {
        if (err)
            throw err;
        Room.getUsers(room, req.params.currentUser, function (err, data) {
            if (err)
                throw err;
            console.log("=======2=========");
            res.json(data);
        });
    });

})
router.get('/roomsdetails', function (req, res) {
    Room.find(function (err, rooms) {
        if (err) throw err;
        res.json(rooms);
    });
});
router.delete('/rooms/:roomName',function(req,res){
    Room.deleteAll(req.params.roomName,function(err,data){
        if(err)
        throw err;
        else
        res.send("successfully deleted all records");
    });
})
module.exports = router;