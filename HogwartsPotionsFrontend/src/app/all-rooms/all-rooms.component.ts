import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-rooms',
  templateUrl: './all-rooms.component.html',
  styleUrls: ['./all-rooms.component.css']
})
export class AllRoomsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  url = "/api/room";
  rooms:Array<any> = [];

  ngOnInit(): void {
    this.http.get(this.url)
    .subscribe((response:any) => {
      console.log(response);
      this.rooms = response;
    })
  }
}
