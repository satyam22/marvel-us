import { Component } from '@angular/core';
//import {HeroesComponent} from'./components/heroes/heroes.component';
@Component({
  selector: 'my-app',
  template: `
  <app-message></app-message>
  <router-outlet></router-outlet>
  `,
})
export class AppComponent  { 
}
