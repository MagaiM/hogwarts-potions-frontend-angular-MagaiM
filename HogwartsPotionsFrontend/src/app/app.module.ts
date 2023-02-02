import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { StudentsComponent } from './students/students.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RoomSelectComponent } from './room-select/room-select.component';

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
    RoomDetailComponent,
    MessagesComponent,
    StudentDetailComponent,
    AllStudentsComponent,
    StudentsComponent,
    LoginComponent,
    RegisterComponent,
    RoomSelectComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
