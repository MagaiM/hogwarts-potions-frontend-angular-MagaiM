import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

import { RoomService } from '../room.service';

@Component({
  selector: 'app-room-by-id',
  templateUrl: './room-by-id.component.html',
  styleUrls: ['./room-by-id.component.css']
})
export class RoomByIdComponent implements OnInit {
  roomNumber: number | undefined;
  validNumberToSearch: boolean = false;
  errorMessage: string | undefined;


  constructor(
    private roomService: RoomService,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  isChanged(): void {
    if (this.roomNumber) {
      if (this.roomNumber > 0) {
        this.validNumberToSearch = true;
        return;
      }
    }
    this.validNumberToSearch = false;
  }

  goToRoom(): void {
    this.router.navigate([`/rooms/details/${this.roomNumber}`]);
  }

  search(): void {
    if (this.roomNumber) {
      const id = this.roomNumber;
      this.roomService.getRoom(this.roomNumber)
      .subscribe(room => {
        if (!room) {
          this.errorMessage = `Room with this number: ${id} does not exists!`;
          return;
        }
        this.goToRoom();
      });
    }
  }
}
