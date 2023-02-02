import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {
  student: Student | undefined;
  houseTypes: String[] = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
  ngSelect: String = "";
  errorMessage: String | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getStudent();
  }

  goBack(): void {
    this.location.back();
  }

  getStudent(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.studentService.getStudent(id)
        .subscribe(student => {
          if (!student) {
            this.errorMessage = `Student with this id: ${id} does not exists!`;
            return;
          }
          this.student = student;
          this.ngSelect = this.houseTypes[student.houseType];
        });
    }
  }

  goToStudents(): void {
    this.router.navigate(['students/all-students']);
  }

  isChanged(): void {
  }

  save(): void {
  }

  delete(): void {
  }
}
