let roomModel=require('./../schema/room');
let create=function(data,callback){
    let newRoom=new roomModel(data);
    newRoom.save(callback);
}
let find=function(data,callback){
    roomModel.find(data,callback);
}
let findOne=function(data,callback){
    roomModel.findOne(data,callback);
}
let findById=function(id,callback){
    roomModel.findById(id,callback);
}
let addUser=function(room,socket,callback){
    let userId=socket.userId;
    let conn={userId:userId,socketId:socket.id};
    room.connections.push(conn);
    room.save(callback);
}
let getUsers=function(room,socket,callback){
    let users=[];
    let vis=[];
    let cunt=0;

    let userId=socket.userId;
    room.connections.forEach(function(conn){
        if(con.userId===userId){
            cunt++;
        }
        if(!vis[conn.userId]){
            users.push(conn.userId);
        }
        vis[conn.userId]=true;
    });
    users.forEach(function(userId,i){
        User.findById(userId,function(err,user){
            if(err){
                return callback(err);
            }
            users[i]=user;
            if(i+1==users.length){
                return callback(null,users,count);
            }
        })
    })
}
let removeUser=function(socket,callback){
    let userId=socket.userId;
    find({},function(err,rooms){
        if(err){
            return callback(err);
        }
        rooms.every(function(room){
            let pass=true;
            let cunt=0,target=0;
            room.connections.forEach(function(conn,i){
                if(conn.userId===userId){
                    cunt++;
                }
                if(conn.socketId===socket.id){
                    pass=false;
                    target=i;
                }
            });
            if(!pass){
                room.connections.id(room/connections[target]._id).remove();
                room.save(function(err){
                    callback(err,room,userId,cunt);
                });
            }
            return pass;
        });
    });
}
module.exports={
    create,find,findOne,findById,getUsers,removeUser,addUser
}