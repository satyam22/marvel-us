import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService{
    private url:string;
    private socket:any;
    constructor(){
        this.url="http://localhost:5000";
        this.socket=io(this.url);
    }
sendMessage(message:string){
    console.log("========inside send message chat service=====");
    this.socket.emit('newMessage',message);
}
getMessages(){
    let observable=new Observable((observer:any)=>{
        this.socket.on('addMessage',(data:any)=>{
            console.log("inside client new message");
            observer.next(data);
        });
        return ()=>{
            this.socket.disconnect();
        };
    });
    return observable;
}
}