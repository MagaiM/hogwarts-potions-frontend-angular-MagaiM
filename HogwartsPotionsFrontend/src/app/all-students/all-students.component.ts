import { Component, OnInit } from '@angular/core';

import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css']
})
export class AllStudentsComponent implements OnInit {
  url = '/api/student';
  students: Student[] = [];
  houseTypes: String[] = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
  errorMessage: string | undefined;

  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getAllStudents()
    .subscribe(students => {
      this.students = students;
    });
  }

  delete(student: Student): void {
    if (confirm("Are you sure you want to delete this student? \n This will permanetle remove this student from Hogwarts!")){
      this.students = this.students.filter(s => s !== student);
      this.studentService.deleteStudent(student.id).subscribe();
    }
  }
}
