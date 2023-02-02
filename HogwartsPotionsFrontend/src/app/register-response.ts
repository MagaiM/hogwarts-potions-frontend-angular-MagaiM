import { Student } from "./student";

export interface RegisterResponse
{
    status: string;
    message: string;
    student: Student;
}