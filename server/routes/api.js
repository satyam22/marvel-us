var express=require('express');
var router=express.Router();
var heroes=require('./../jsondata/heroes.json');
var dummyData={
    "name":"satyam",
    "city":"nagpur"
};

var test={"result":["test1","test2"]};
router.get('/',function(req,res){
    res.send("Api server is running");
})

router.get("/test",function(req,res){
    res.json(test);
});
router.get('/heroes',function(req,res){
res.json(heroes);
});
module.exports=router;