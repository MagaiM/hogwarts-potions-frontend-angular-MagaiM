import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.component.html',
  styleUrls: ['./all-rooms.component.css']
})
export class AllRoomsComponent implements OnInit {

  constructor(
    private roomService: RoomService) { }

  url = "/api/room";
  rooms: Room[] = [];
  houseTypes: String[] = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];

  ngOnInit(): void {
    this.getRooms();
  }

  getRooms(): void {
    this.roomService.getAllRooms()
    .subscribe(rooms => {
      this.rooms = rooms;
    });
  }

  delete(room: Room): void {
    this.rooms = this.rooms.filter(r => r !== room);
    this.roomService.deleteRoom(room.id).subscribe();
  }
}
