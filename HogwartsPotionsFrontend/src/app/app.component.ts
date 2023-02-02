import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentService } from './student.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn$: Observable<boolean>;

  constructor(private studentService: StudentService) {
    setInterval( ()=> this.time = new Date(), 1000);
    this.isLoggedIn$ = this.studentService.isLoggedIn;
  }

  title = 'HogwartsPotions';
  time = new Date();

  logOut(){
    this.studentService.logout();
  }
}
