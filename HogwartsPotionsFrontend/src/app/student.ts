import { Room } from "./room";

export interface Student {
    id: string;
    userName: string;
    houseType: number;
    petType: number;
    room: Room;
    availableRooms: Room[];
}