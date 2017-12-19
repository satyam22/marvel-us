//import {NgModule} from '@angular/core';
import {Routes} from '@angular/router';
import {HeroesComponent} from './components/heroes/heroes.component';
import {ChatComponent} from './components/chatbox/chat-component/chat.component';
import {NickNameComponent} from './components/chatbox/nickName-component/nickName.component';


export const routes:Routes=[
    {path:'',component:HeroesComponent},
    {path: 'rooms',component:NickNameComponent},
    {path:'chatroom/:roomName/:nickName',component:ChatComponent}
];