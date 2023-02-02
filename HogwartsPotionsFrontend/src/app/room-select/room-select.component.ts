import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Room } from '../room';
import { StudentService } from '../student.service';
import { Student } from '../student';

@Component({
  selector: 'app-room-select',
  templateUrl: './room-select.component.html',
  styleUrls: ['./room-select.component.css']
})
export class RoomSelectComponent implements OnInit {

  student: Student | undefined;
  petTypes: string[] = ["None", "Cat", "Rat", "Owl"];
  houseTypes: string[] = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin", "None"];
  houseType: string | undefined;
  errorMessage: string | undefined;

  constructor(
    private studentService: StudentService,
    private router: Router,
    private route: ActivatedRoute,
    ) { }


  ngOnInit(): void {
    this.getStudent();
  }

  goToStudent(studentId: string): void {
    this.router.navigate([`students/details/${studentId}`]);
  }

  getStudent(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.studentService.getRoomsForStudent(id)
        .subscribe(student => {
          console.log(student);
          if (!student) {
            this.errorMessage = `Student with this id: ${id} does not exists!`;
            return;
          }
          this.student = student;
          this.houseType = this.houseTypes[student.houseType];
        });
    }
  }

  selectRoom(room: Room): void {
    if (this.student){
      this.studentService.addStudentToRoom(this.student.id, room)
      .subscribe((student) => {
        this.goToStudent(student.id);
      });
    }
  }
}
