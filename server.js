let express=require('express');
let app=express();

let http=require('http').Server(app);
let io=require('socket.io')(http);

let MongoClient=require('mongodb').MongoClient;
let path=require('path');
let bodyParser=require('body-parser');

let db;
let dbUrl="mongodb://root:satyam123@ds141786.mlab.com:41786/marvelus";
var api=require('./server/routes/api');



app.use(bodyParser.json());
app.use(bodyParser({urlEncoded:false}));

MongoClient.connect(dbUrl,(err,database)=>{
    if(err){
        console.log("error occured while connecting to database");
        cosnole.log(err);    
    }
    db=database;
    app.listen(3007,()=>{
        console.log("app is listening at port 3007");
    })
})

app.use(express.static(path.join(__dirname,'public')));
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
})
app.use('/api',api);

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'index.html'));
})

io.on('connection',(socket)=>{
    console.log("User connected");
    socket.on('disconnect',()=>{
        console.log("User disconnected");
    })
    socket.on('add-message',(message)=>{
        io.emit('new-message',message);
        dataStorage(message);
    })
})
function dataStorage(message){
let storeData={chatMessage:message,timestamp:new Date().getTime()};
db.collection('chatroom-chat').save(storeData,(err,data)=>{
    if(err){
        console.log("error occured while saving data to database");
        console.log(err);
    }
    console.log("data saved successfully");
})
}
let port=process.env.PORT||5000;
http.listen(port,function(){
    console.log("app is listening at port: "+port);
})