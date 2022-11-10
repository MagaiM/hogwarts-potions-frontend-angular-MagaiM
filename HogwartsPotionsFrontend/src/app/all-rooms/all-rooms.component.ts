import { Component, OnInit } from '@angular/core';
import { Room } from '../room';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.component.html',
  styleUrls: ['./all-rooms.component.css']
})
export class AllRoomsComponent implements OnInit {
  url = "/api/room";
  rooms: Room[] = [];
  houseTypes: String[] = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin"];
  errorMessage: string | undefined;

  constructor(private roomService: RoomService) { }

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
    if (room.residents.length > 0) {
      alert("You can delete only empty rooms!");
      return;
    }

    if (confirm("Are you sure you want to delete this room? \n This will permanetle remove this room from Hogwarts!")){
      this.rooms = this.rooms.filter(r => r !== room);
      this.roomService.deleteRoom(room.id).subscribe();
    }
  }
}
