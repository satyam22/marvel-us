import { Component } from '@angular/core';
//import {HeroesComponent} from'./components/heroes/heroes.component';
@Component({
  selector: 'my-app',
  template: `
  <h1>{{title}}</h1>
  <app-message></app-message>
  <router-outlet></router-outlet>
  `,
})
export class AppComponent  { 
  name = 'Satyam';
  title='Tour of Heroes';
}
