import { Room } from "./room";

export interface Student {
    id: number;
    name: string;
    houseType: number;
    petType: number;
    room: Room;
}