import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RoomsComponent } from './rooms/rooms.component';
import { PotionsComponent } from './potions/potions.component';
import { HomeComponent } from './home/home.component';
import { AllRoomsComponent } from './all-rooms/all-rooms.component';
import { RoomByIdComponent } from './room-by-id/room-by-id.component';
import { RatFriendlyRoomsComponent } from './rat-friendly-rooms/rat-friendly-rooms.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { UpdateRoomComponent } from './update-room/update-room.component';
import { DeleteRoomComponent } from './delete-room/delete-room.component';

@NgModule({
  declarations: [
    AppComponent,
    RoomsComponent,
    PotionsComponent,
    HomeComponent,
    AllRoomsComponent,
    RoomByIdComponent,
    RatFriendlyRoomsComponent,
    CreateRoomComponent,
    UpdateRoomComponent,
    DeleteRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
