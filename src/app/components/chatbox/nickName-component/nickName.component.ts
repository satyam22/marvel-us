import { Component,OnInit} from "@angular/core";
import {ChatService} from "../service/chatbox.service";
import {NickNameService} from '../service/nickName.service';


@Component({
    selector: "nick-name",
    templateUrl: "./nickName.component.html",
    styleUrls:["./nickName.component.css"]
})

export class NickNameComponent {
    nickName:string;
    roomsList:string[];
    accessRoomsList:Boolean;
    errorMsg:string;
    constructor(private nickNameService:NickNameService){
        this.nickName="";
        this.roomsList=[];
        this.accessRoomsList=false;
    }

createNickName(nickName:string){
this.nickName=nickName;
this.accessRoomsList=true;
}
createRoom(roomName:string){
  //  this.roomsList.push(roomName);
    console.log("=====Rooms list=======");
    //console.log(this.roomsList);
    this.nickNameService.createRoom(roomName);
}
ngOnInit(){
    this.nickNameService.getRooms().subscribe(rooms=>{
        this.roomsList=rooms;
    });
    this.nickNameService.AddNewRooms().subscribe(data=>{
        console.log("inside new Rooms");
        console.log(data);
        if(data["error"]){
            this.errorMsg=data["error"];
        }
        else{
            this.roomsList.push(data["title"]);
        }
    })
}

}

}