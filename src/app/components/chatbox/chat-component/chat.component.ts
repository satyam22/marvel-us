import { Component,OnInit,OnDestroy} from "@angular/core";
import {ChatService} from "../service/chatbox.service";

/// <reference path="../../typings/globals/jquery/index.d.ts/>




@Component({
  selector: "chat-page",
  templateUrl: "./chat.component1.html",
  styleUrls:['./chat.component.css','https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css']
})

export class ChatComponent {

  messages:string[]=[];
  connection:any;
  message:string;
  constructor(private chatService:ChatService){

  }
  sendMessage(){
    console.log("========inside send message=====");
    this.chatService.sendMessage(this.message);
    this.message='';
  }
  ngOnInit(){
    this.connection=this.chatService.getMessages().subscribe((message:string)=>{
      this.messages.push(message);
    });
  }
  ngOnDestroy(){
    this.connection.unsubscribe();
  }
}