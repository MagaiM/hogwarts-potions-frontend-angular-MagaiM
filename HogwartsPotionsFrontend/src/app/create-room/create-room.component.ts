import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

import { Room } from '../room';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-create-room',
  templateUrl: './create-room.component.html',
  styleUrls: ['./create-room.component.css']
})
export class CreateRoomComponent implements OnInit {
  room: Room = {
    capacity : 5,
    residents:[],
    id: 0,
    roomHouseType: 0
  };
  houseTypes: String[] = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
  ngSelect: string | undefined;
  capacity: Number = 5;
  houseTypeSelectedAndValidCap: boolean = false;
  maxRoomCapacity: number = 999;
  minRoomCapacity: number = 1;
  
  constructor(
    private roomService: RoomService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  goToNewRoom(): void {
    this.router.navigate([`rooms/details/${this.room.id}`]);
  }

  isChanged(): void {

    if (this.room.capacity > this.maxRoomCapacity ||
      this.room.capacity < this.room.residents.length ||
      this.room.capacity < this.minRoomCapacity) {
        this.houseTypeSelectedAndValidCap = false;
        return;
    }
    
    if (this.ngSelect) {
      this.houseTypeSelectedAndValidCap = true;
      return;
    }

    this.houseTypeSelectedAndValidCap = false;
  }

  add(): void {
    if (this.ngSelect) {
      if (this.room.capacity > 999) this.room.capacity = 999;
      if (this.room.capacity < 1) this.room.capacity = 1;
      let newRoomHouseType = this.houseTypes.indexOf(this.ngSelect);
      if (newRoomHouseType !== -1) this.room.roomHouseType = newRoomHouseType;
      else return;
      this.roomService.addRoom(this.room).subscribe((room) => {
        this.room = room;
        this.goToNewRoom();
      });
    }
  }
}
