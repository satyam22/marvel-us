import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppComponent }  from './app.component';
import {HeroesComponent} from './components/heroes/heroes.component';
import {MessageComponent} from './components/messages/messages.component'
import {ChatComponent} from './components/chatbox/chat-component/chat.component';
import {NickNameComponent} from './components/chatbox/nickName-component/nickName.component';
import {HeroService} from './components/heroes/hero.service';
import {ChatService} from './components/chatbox/service/chatbox.service';
import {NickNameService} from './components/chatbox/service/nickName.service';
import {MessageService} from './components/messages/message.service';
import {RouterModule} from '@angular/router';
import {routes} from './app-routing.module';

@NgModule({
  imports:      [ HttpClientModule,BrowserModule,FormsModule,NgbModule.forRoot(),RouterModule.forRoot(routes)],
  declarations: [ AppComponent,HeroesComponent,MessageComponent,ChatComponent,NickNameComponent],
  bootstrap:    [ AppComponent ],
  providers:[HeroService,MessageService,ChatService,NickNameService]
})
export class AppModule { }
