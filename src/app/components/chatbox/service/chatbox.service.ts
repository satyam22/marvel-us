import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class ChatService {
    private url: string;
    private socket: any;
    constructor(private http: HttpClient) {
        this.url = "http://localhost:5000";
        this.socket = io(this.url);
    }
    sendMessage(roomId:string,msgObj:any) {
        console.log("========inside send message chat service=====");
        this.socket.emit('newMessage',roomId,msgObj);
    }
    joinUser(roomName: string, nickName: string) {
        console.log("join user service");
        this.socket.emit('join user',{room:roomName,name:nickName});
    }
    getMessages() {
        let observable = new Observable((observer: any) => {
            this.socket.on('addMessage', (data: any) => {
                console.log("inside client new message");
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
        return observable;
    }
    getUsers(){
    let observable=new Observable((observer:any)=>{
        this.socket.on('updateUsersList',(data:any)=>{
            observer.next(data);
        });
        return ()=>{
            this.socket.disconnect();
        };
    });
    return observable;
    }
    userTyping(username:string,room:string,isTyping:boolean){
        this.socket.emit('user is typing',username,room,isTyping);
    }
    getUserTyping(){
        let observable=new Observable((observer:any)=>{
            this.socket.on('user is typing',(data:any)=>{
                console.log("user is typing:::"+data);
                observer.next(data);
            });
            return ()=>{
                this.socket.disconnect();
            };
        });
        return observable;
    }
}