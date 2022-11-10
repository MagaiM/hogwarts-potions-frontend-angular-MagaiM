import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllRoomsComponent } from './all-rooms/all-rooms.component';
import { AllStudentsComponent } from './all-students/all-students.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { HomeComponent } from './home/home.component';
import { PotionsComponent } from './potions/potions.component';
import { RatFriendlyRoomsComponent } from './rat-friendly-rooms/rat-friendly-rooms.component';
import { RoomByIdComponent } from './room-by-id/room-by-id.component';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { RoomsComponent } from './rooms/rooms.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentsComponent } from './students/students.component';

const routes: Routes = [
  {path: '', redirectTo: "home", pathMatch: 'full' },
  {path: 'home', component: HomeComponent },
  {
    path: 'rooms', 
    component: RoomsComponent,
    children: [
      {
        path: 'all-rooms',
        component: AllRoomsComponent,
      },
      {
        path: 'details/:id',
        component: RoomDetailComponent,
      },
      {
        path: 'rooms-by-id',
        component: RoomByIdComponent,
      },
      {
        path: 'rat-friendly-rooms',
        component: RatFriendlyRoomsComponent,
      },
      {
        path: 'create-room',
        component: CreateRoomComponent,
      }
    ]
  },
  {path: 'students', component: StudentsComponent,
    children: [
      {
        path: 'all-students',
        component: AllStudentsComponent
      },
      {
        path: 'details/:id',
        component: StudentDetailComponent,
      }
    ]},
  {path: 'potions', component: PotionsComponent },

  {path: '**', redirectTo: "home", pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
