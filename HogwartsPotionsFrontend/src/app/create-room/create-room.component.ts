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

  capacity: Number = 5;
  
  constructor(
    private roomService: RoomService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  goToNewRoom(): void {
    this.router.navigate([`rooms/details/${this.room.id}`]);
  }

  add(capacity: string): void {

    if (!capacity) {
      return;
    }
    this.room.capacity = Number(capacity);
    this.roomService.addRoom(this.room).subscribe((room) => {
      this.room = room;
      this.goToNewRoom();
    });
  }
}
