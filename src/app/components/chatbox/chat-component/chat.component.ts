import { Component,OnInit,OnDestroy} from "@angular/core";
import {ChatService} from "../service/chatbox.service";
import {ActivatedRoute} from '@angular/router';
/// <reference path="../../typings/globals/jquery/index.d.ts/>




@Component({
  selector: "chat-page",
  templateUrl: "./chat.component1.html",
  styleUrls:['./chat.component.css','https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css']
})

export class ChatComponent {

  messages:any[]=[];
  connection:any;
  sub:any;
  message:string;
  msgObj:any={};
  roomName:string;
  nickName:string;
  currentUsers:string[]
  constructor(private chatService:ChatService,private route:ActivatedRoute){

  }
  sendMessage(){
    console.log("========inside send message=====");
    this.msgObj.text=this.message;
    this.msgObj.sender=this.nickName;
    this.msgObj.timestamp=new Date();
    this.chatService.sendMessage(this.roomName,this.msgObj);
    this.message='';
  }
  ngOnInit(){
    this.connection=this.chatService.getMessages().subscribe((message:any)=>{
      console.log("=========received message======");
      console.log(message);
    this.messages.push(message);
    });
    this.sub=this.route.params.subscribe(params=>{
      this.roomName=params['roomName'];
      this.nickName=params['nickName'];
      this.chatService.joinUser(this.roomName,this.nickName);
      this.chatService.getUsers().subscribe((users:string[])=>{
        console.log("chat service:: users");
        this.currentUsers=users;
      })
      console.log("Room Name param "+this.roomName);
    })
  }
  ngOnDestroy(){
    this.connection.unsubscribe();
  }
}