import { Student } from "./student";

export interface Room
{
    capacity: number;
    id: number;
    residents: Student[];
}