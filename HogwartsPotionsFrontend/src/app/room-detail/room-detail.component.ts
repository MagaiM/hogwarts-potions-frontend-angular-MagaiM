import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Room } from '../room';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  room: Room | undefined;
  houseTypes: String[] = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
  originalCapacity: number | undefined;
  originalHouseType: number | undefined;
  maxRoomCapacity: number = 999;
  minRoomCapacity: number = 1;
  ngSelect: String = "";
  errorMessage: String | undefined;
  inputChangedAndValid: boolean = false;
  roomIsEmpty: boolean | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roomService: RoomService,
  ) { }

  ngOnInit(): void {
    this.getRoom();
  }

  getRoom(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.roomService.getRoom(id)
      .subscribe(room => {
        if (!room) {
          this.errorMessage = `Room with this id: ${id} does not exists!`;
          return;
        }
        this.room = room;
        this.originalCapacity = room.capacity;
        this.originalHouseType = room.roomHouseType;
        this.ngSelect = this.houseTypes[room.roomHouseType];
        this.roomIsEmpty = this.room.residents.length === 0;
      });
  }

  isChanged(): void {
    if (this.room) {
      if (this.room.capacity > this.maxRoomCapacity ||
        this.room.capacity < this.room.residents.length ||
        this.room.capacity < this.minRoomCapacity) {
          this.inputChangedAndValid = false;
          return;
      }
      if (this.room.capacity !== this.originalCapacity || 
        this.houseTypes.indexOf(this.ngSelect) !== this.originalHouseType){
        this.inputChangedAndValid = true;
        return;
      }
      this.inputChangedAndValid = false;
    }
  }

  goToRooms(): void {
    this.router.navigate(['rooms/all-rooms']);
  }

  save(): void {
    if (this.room) {
      if (this.room.capacity <= this.room.residents.length) {
        if (this.room.residents.length < 1) {
          this.room.capacity = 1;
        } else{
          this.room.capacity = this.room.residents.length;
        }
      }

      if (this.room.capacity > 999) {
        this.room.capacity = 999
      }

      let newRoomHouseType = this.houseTypes.indexOf(this.ngSelect);
      if (newRoomHouseType !== -1) {
        this.room.roomHouseType = newRoomHouseType;
      }

      this.roomService.updateRoom(this.room)
        .subscribe(()=> {
          this.goToRooms();
        }, err => {
          this.getRoom();
          this.errorMessage = err.error;
        });
    }
  }
}
