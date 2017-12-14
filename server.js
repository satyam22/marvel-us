var express=require('express');
var path=require('path');
var bodyParser=require('body-parser');

var api=require('./server/routes/api');


var port=process.env.PORT||3007;

var app=express();
app.use(bodyParser.json());
app.use(bodyParser({urlEncoded:false}));

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
    res.sendFile('index.html');
})
app.listen(port,function(){
    console.log("app is listening at port: "+port);
})