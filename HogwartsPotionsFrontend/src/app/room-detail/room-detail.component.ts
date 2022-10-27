import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Room } from '../room';
import { RoomService } from '../room.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.css']
})
export class RoomDetailComponent implements OnInit {
  room: Room | undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private roomService: RoomService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getRoom();
  }

  getRoom(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.roomService.getRoom(id)
      .subscribe(room => this.room = room);
  }

  goToRooms(): void {
    this.router.navigate(['rooms/all-rooms']);
  }

  save(): void {
    if (this.room) {
      this.roomService.updateRoom(this.room)
        .subscribe(()=> this.goToRooms());
    }
  }
}
