import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  ) { }

  ngOnInit(): void {
    this.getStudent();
  }

  getStudent(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
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

  goToStudents(): void {
    this.router.navigate(['students/all-students']);
  }

  isChanged(): void {
    // if (this.room) {
    //   if (this.room.capacity > this.maxRoomCapacity ||
    //     this.room.capacity < this.room.residents.length ||
    //     this.room.capacity < this.minRoomCapacity) {
    //       this.inputChangedAndValid = false;
    //       return;
    //   }
    //   if (this.room.capacity !== this.originalCapacity || 
    //     this.houseTypes.indexOf(this.ngSelect) !== this.originalHouseType){
    //     this.inputChangedAndValid = true;
    //     return;
    //   }
    //   this.inputChangedAndValid = false;
    // }
  }

  save(): void {
    // if (this.room) {
    //   if (this.room.capacity <= this.room.residents.length) {
    //     if (this.room.residents.length < 1) {
    //       this.room.capacity = 1;
    //     } else{
    //       this.room.capacity = this.room.residents.length;
    //     }
    //   }

    //   if (this.room.capacity > 999) {
    //     this.room.capacity = 999
    //   }

    //   let newRoomHouseType = this.houseTypes.indexOf(this.ngSelect);
    //   if (newRoomHouseType !== -1) {
    //     this.room.roomHouseType = newRoomHouseType;
    //   }

    //   this.roomService.updateRoom(this.room)
    //     .subscribe(()=> {
    //       this.goToRooms();
    //     }, err => {
    //       this.getRoom();
    //       this.errorMessage = err.error;
    //   });
    // }
  }

  delete(): void {
    // if (this.room) {
    //   if (!this.roomIsEmpty) {
    //     alert("You can delete only empty rooms!");
    //     return;
    //   }
      
    //   if (confirm("Are you sure you want to delete this room? \n This will permanetle remove this room from Hogwarts!")){
    //     this.roomService.deleteRoom(this.room.id).subscribe();
    //     this.goToRooms();
    //   }
    // }
  }
}
