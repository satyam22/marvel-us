import { Component, OnInit, OnDestroy } from "@angular/core";
import { ChatService } from "../service/chatbox.service";
import { ActivatedRoute } from "@angular/router";
import { MessageService } from "./../../messages/message.service";

@Component({
  selector: "chat-page",
  templateUrl: "./chat.component1.html",
  styleUrls: [
    "./chat.component.css",
    "https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
  ]
})
export class ChatComponent {
  messages: any[] = [];
  connection: any;
  sub: any;
  message: string;
  msgObj: any = {};
  roomName: string;
  nickName: string;
  currentUsers: string[];
  isUserTyping: boolean = false;
  userTypeName: string;
  constructor(
    private chatService: ChatService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}
  keydownFunc(event: any) {
    let typing=false;
    let timeout;
    let timeoutFunction=()=>{
      typing=false;
      this.chatService.userStoppedTyping(this.nickName,this.roomName);
    }
    if (event.keyCode == 13) this.sendMessage();
    else{
      this.chatService.userIsTyping(this.nickName,this.roomName);      
      if(!typing){
        typing=true;
        timeout=setTimeout(timeoutFunction,3000);
      }
      else{
        clearTimeout(timeout);
        timeout=setTimeout(timeoutFunction,3000);
      }
    }
    
  }
  sendMessage() {
    let date = new Date();
    let timestamp =
      (date.getHours() > 12 ? date.getHours() - 12 : date.getHours()) +
      ":" +
      date.getMinutes() +
      " " +
      (date.getHours() > 12 ? "am" : "pm");
    console.log("========inside send message=====");
    console.log(this.message);
    if (this.message.trim().length != 0) {
      this.msgObj.text = this.message;
      this.msgObj.sender = this.nickName;
      this.msgObj.timestamp = timestamp;
      this.chatService.sendMessage(this.roomName, this.msgObj);
    }
    this.message = "";
  }
  ngOnInit() {
    this.connection = this.chatService
      .getMessages()
      .subscribe((message: any) => {
        console.log("=========received message======");
        console.log(message);
        this.messages.push(message);
      });
    this.sub = this.route.params.subscribe(params => {
      this.roomName = params["roomName"];
      this.nickName = params["nickName"];
      this.chatService.joinUser(this.roomName, this.nickName);
      this.chatService.getUsers().subscribe((users: string[]) => {
        console.log("chat service:: users");
        this.currentUsers = users;
      });
      console.log("Room Name param " + this.roomName);
    });
    this.chatService.userTypingSignal().subscribe((username:string) => {
       console.log("is typing");
       console.log(username);
         this.isUserTyping=true;
         this.userTypeName=username;
    });
    this.chatService.userStoppedTypingSignal().subscribe(()=>{
      console.log("user stopped typeing");
      this.isUserTyping=false;
    })
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }
}
