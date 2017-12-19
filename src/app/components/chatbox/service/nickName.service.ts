import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import * as io from 'socket.io-client';
@Injectable()
export class NickNameService{
    private url:string;
    private socket:any;
    constructor(private http:HttpClient){
        this.url="http://localhost:5000";
        this.socket=io(this.url);
    }
    createRoom(roomName:string){
        console.log("===inside create room service");
        this.socket.emit('createRoom',roomName);
        this.socket.emit('join user');
    }
    getRooms(){
        return this.http.get<string[]>("http://localhost:5000/api/rooms");
    }
    AddNewRooms(){
        let observable=new Observable((observer:any)=>{
            this.socket.on('updateRoomsList',(data:any)=>{
                observer.next(data);
            });
            return ()=>{
                this.socket.disconnect();
            };
        });
        return observable;
    }
    
}