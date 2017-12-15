
let Mongoose=require('mongoose');
var UserSchema=mongoose.Schema({
    name:{type:String,required:true},
    character:{type:String}
});
let userModel=Mongoose.model('user',UserSchema);
module.exports=userModel;