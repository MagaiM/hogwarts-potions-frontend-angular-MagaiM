import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    setInterval( ()=> this.time = new Date(), 1000);
  }

  title = 'HogwartsPotions';

  time = new Date();

}
