import { Component,onInit} from "@angular/core";
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
}

}

}