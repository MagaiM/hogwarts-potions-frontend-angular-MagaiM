import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  goBack(): void {
    this.location.back();
  }

  save(): void {
    console.log(this.room);
    if (this.room) {
      this.roomService.updateRoom(this.room)
        .subscribe(()=> this.goBack());
    }
  }
}
