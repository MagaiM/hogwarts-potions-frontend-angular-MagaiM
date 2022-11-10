import { Component, OnInit } from '@angular/core';

import { Room } from '../room';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-rat-friendly-rooms',
  templateUrl: './rat-friendly-rooms.component.html',
  styleUrls: ['./rat-friendly-rooms.component.css']
})
export class RatFriendlyRoomsComponent implements OnInit {
  rooms: Room[] = [];
  houseTypes: String[] = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];

  constructor(private roomService: RoomService) { }


  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void {
    this.roomService.getRatFriendlyRooms()
    .subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  delete(room: Room): void {
    this.rooms = this.rooms.filter(r => r !== room);
    this.roomService.deleteRoom(room.id).subscribe();
  }
}
