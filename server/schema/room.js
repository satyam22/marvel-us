let Mongoose=require('mongoose');

let RoomSchema=new Mongoose.Schema({
    title:{type:String,required:true},
    connections:{type:[{userId:String,socketId:String}]}
})

let roomModel=Mongoose.model('room',RoomSchema);
module.exports=roomModel;