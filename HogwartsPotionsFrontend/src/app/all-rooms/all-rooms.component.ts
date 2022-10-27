// import { HttpClient } from '@angular/common/http';
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
    // private http: HttpClient,
    private roomService: RoomService) { }

  url = "/api/room";
  rooms: Room[] = [];

  ngOnInit(): void {
    this.getRooms();
    // this.http.get(this.url)
    // .subscribe((response:any) => {
    //   console.log(response);
    //   this.rooms = response;
    // })
  }

  getRooms(): void {
    this.roomService.getAllRooms()
    .subscribe(rooms => {
      this.rooms = rooms;
      console.log(this.rooms);
    });
  }

  delete(room: Room): void {
    this.rooms = this.rooms.filter(r => r !== room);
    this.roomService.deleteRoom(room.id).subscribe();
  }
}
