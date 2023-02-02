import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { User } from '../user';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = {
    userName: "",
    password: "",
    petType: 0,
    preferredHouseType: 0
  };
  student: Student | undefined;
  errorMessage: String | undefined;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  goToHome(): void {
    this.router.navigate(['/']);
  }

  goToRoomSelect(): void {
    this.router.navigate([`room-select/${this.student?.id}`]);
  }

  getStudent(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id){
      this.studentService.getStudent(id)
        .subscribe(student => {
          if (!student) {
            this.errorMessage = `Student with this id: ${id} does not exists!`;
            return;
          }
          this.student = student;
        });
    }
  }

  login(): void {
    if (this.user) {
      if (this.user.userName !== "" && this.user.password !== "") {
        this.studentService.login(this.user)
        .subscribe((response)=> {
          this.student = response.student;
          if (!response.student.room){
            this.goToRoomSelect();
          } else {
            this.goToHome();
          }
        }, err => {
          this.getStudent();
          this.errorMessage = err.error;
      });
      }
    }
  }
}
