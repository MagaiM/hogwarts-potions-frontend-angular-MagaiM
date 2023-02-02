import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentService } from './student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  isLoggedIn$: Observable<boolean>;

  constructor(
    private router: Router,
    private studentService: StudentService
    ) {
    setInterval( ()=> this.time = new Date(), 1000);
    this.isLoggedIn$ = this.studentService.isLoggedIn;
  }

  title = 'HogwartsPotions';
  time = new Date();

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  logOut(){
    var user = this.studentService.userValue;
    console.log(user);
    if(user) {
      this.studentService.logout()
      .subscribe(_ => this.goToLogin());
    }
  }
}
