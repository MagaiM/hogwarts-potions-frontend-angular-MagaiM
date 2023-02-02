import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Student } from '../student';
import { User } from '../user';
import { Room } from '../room';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User | undefined;
  studentName : string = "";
  studentPassword : string = "";
  studentPasswordAgain : string = "";
  studentPet : string = "None";
  studentPreffHouseType: string = "None";
  petTypes: string[] = ["None", "Cat", "Rat", "Owl"];
  houseTypes: string[] = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin", "None"];
  validRooms: Room[] | undefined;
  validUserInputs: boolean = false;
  errorMessage: string | undefined;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }

  isValidInputs(): boolean {
    if (this.studentName === "") return false;
        //TODO add passwod validation here!
    if (this.studentPassword === "") return false;
        //TODO add passwod validation here!
    if (this.studentPasswordAgain === "") return false;
    if (this.studentPassword !== this.studentPasswordAgain) {
      this.errorMessage = "The two passwords given does not match!";
      return false;
    }
    // Do you need to check on select?
    this.errorMessage = undefined;
    return true;
  }

  isChanged(): void {
    if (this.isValidInputs()) {
      this.validUserInputs = true;
      return;
    }
    this.validUserInputs = false;
  }

  goToStudents(): void {
    this.router.navigate(['students/all-students']);
  }

  goToStudent(studentId: string): void {
    this.router.navigate([`students/details/${studentId}`]);
  }

  goToLogin(): void {
    this.router.navigate(['login']);
  }

  registerFirstStep(): void {
    this.user = {
      userName: this.studentName,
      password: this.studentPassword,
      preferredHouseType: this.houseTypes.indexOf(this.studentPreffHouseType),
      petType: this.petTypes.indexOf(this.studentPet)
    }
    this.studentService.addStudent(this.user)
    .subscribe((response) => {
      if (response.status === "Success"){
        this.goToLogin();
      } else {
        this.errorMessage = response.message;
      }
    });
  }
}
