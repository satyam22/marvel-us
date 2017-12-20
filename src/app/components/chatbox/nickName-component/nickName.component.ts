import { Component, OnInit } from "@angular/core";
import { ChatService } from "../service/chatbox.service";
import { NickNameService } from '../service/nickName.service';
import {Router} from '@angular/router';
import {MessageService} from './../../messages/message.service';

@Component({
    selector: "nick-name",
    templateUrl: "./nickName.component.html",
    styleUrls: ["./nickName.component.css"]
})

export class NickNameComponent {
    nickName: string;
    roomsList: string[];
    accessRoomsList: Boolean;
    errorMsg: string;
    charMsg: string;
    constructor(private nickNameService: NickNameService,private router:Router,private messageService:MessageService) {
        this.nickName = "";
        this.roomsList = [];
        this.accessRoomsList = false;
        this.charMsg = "";
    }

    createNickName(nickName: string) {
        if (nickName != "") {
            this.nickName = nickName;
            this.accessRoomsList = true;
            this.charMsg = "Hello " + this.nickName + ", Create your Own room or join existing rooms";
        }

    }
    createRoom(roomName: string) {
        //  this.roomsList.push(roomName);
        console.log("=====Rooms list=======");
        //console.log(this.roomsList);
        this.nickNameService.createRoom(roomName);
    }
    accessRoom(roomName:string){
        console.log("===room name==="+roomName);
        this.router.navigate(['/chatroom',roomName,this.nickName]);
    }
    ngOnInit() {
        this.nickNameService.getRooms().subscribe(rooms => {
            this.roomsList = rooms;
        });
        this.nickNameService.AddNewRooms().subscribe(data => {
            console.log("inside new Rooms");
            console.log(data);
            if (data["error"]) {
                console.log("error occured");
                console.log(data["error"]);
                this.errorMsg = data["error"];
                this.messageService.add(data["error"]);
            }
            else {
                this.roomsList.push(data["title"]);
            }
        })
    }

}

