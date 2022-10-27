import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllRoomsComponent } from './all-rooms/all-rooms.component';
import { CreateRoomComponent } from './create-room/create-room.component';
import { DeleteRoomComponent } from './delete-room/delete-room.component';
import { HomeComponent } from './home/home.component';
import { PotionsComponent } from './potions/potions.component';
import { RatFriendlyRoomsComponent } from './rat-friendly-rooms/rat-friendly-rooms.component';
import { RoomByIdComponent } from './room-by-id/room-by-id.component';
import { RoomsComponent } from './rooms/rooms.component';
import { UpdateRoomComponent } from './update-room/update-room.component';

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
      },
      {
        path: 'update-room',
        component: UpdateRoomComponent,
      },
      {
        path: 'delete-room',
        component: DeleteRoomComponent,
      }
    ]
  },
  {path: 'potions', component: PotionsComponent },

  {path: '**', redirectTo: "home", pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
