import {Injectable} from '@angular/core';
import {Hero} from './heroes.interface';
import {HEROES} from './mock-data/mock-heroes';
import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/Observable/of';
import {MessageService} from './../messages/message.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HeroService{
    //heroes:Hero[];
    constructor(private messageService:MessageService,private http:HttpClient){

    }
    getHero():Observable<Hero[]>{
       // this.messageService.add("Hero Service fethed heroes...");
       //return of(HEROES);
    return this.http.get<Hero[]>("http://localhost:5000/api/heroes");
    }
    }

