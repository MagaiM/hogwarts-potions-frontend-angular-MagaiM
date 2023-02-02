import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Student } from './student';
import { Room } from './room';
import { User } from './user';
import { RegisterResponse } from './register-response';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class StudentService {

  private studentsUrl = '/api/student';  // URL to web api
  private registerUrl = '/api/student/register';
  private loginUrl = '/api/login';
  private houseTypes: string[] = ["Gryffindor", "Hufflepuff", "Ravenclaw", "Slytherin", "None"];
  private userSubject: BehaviorSubject<Student | null>;
  public user: Observable<Student | null>;
  private loggedIn = new BehaviorSubject<boolean>(false);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService,
    private router: Router,
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

  public get userValue(){
    return this.userSubject.value;
  }

  public get isLoggedIn(){
    return this.loggedIn.asObservable();
  }

    /** GET all students from the server */
  getAllStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.studentsUrl)
      .pipe(
        tap(_ => this.log('fetched all students')),
        catchError(this.handleError<Student[]>('getAllStudents', []))
      );
  }

  /** GET student by id. Return `undefined` when id not found */
  getStudentNo404<Data>(id: string): Observable<Student> {
    const url = `${this.studentsUrl}/?id=${id}`;
    return this.http.get<Student[]>(url)
      .pipe(
        map(students => students[0]), // returns a {0|1} element array
        tap(r => {
          const outcome = r ? 'fetched' : 'did not find';
          this.log(`${outcome} student id=${id}`);
        }),
        catchError(this.handleError<Student>(`getStudent id=${id}`))
      );
  }

  /** GET student by id. Will 404 if id not found */
  getStudent(id: string): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.get<Student>(url).pipe(
      tap(_ => this.log(`fetched student id=${id}`)),
      catchError(this.handleError<Student>(`get id=${id}`))
    );
  }

  /** GET available rooms for student by id */
  getRoomsForStudent(id: string): Observable<Student> {
    const url = `${this.studentsUrl}/select-room/${id}`;
    return this.http.get<Student>(url).pipe(
      tap(_ => this.log(`fetched available rooms for student: ${id}`)),
      catchError(this.handleError<Student>(`get available rooms for student: ${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: login */
  login(user: User): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.loginUrl, user, this.httpOptions).pipe(
      map(registerResponse => {
        localStorage.setItem('user', JSON.stringify(registerResponse.student));
        this.userSubject.next(registerResponse.student);
        this.loggedIn.next(true);
        return registerResponse;
      }),
      tap((response: RegisterResponse) => this.log(`logedin w/ userName=${response.student.userName}`)),
      catchError(this.handleError<RegisterResponse>('loginUser'))
    );
  }

  logout(){
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.loggedIn.next(false);
    this.router.navigate([this.loginUrl]);
  }

  /** POST: add a new student to Hogwarts */
  addStudent(user: User): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(this.registerUrl, user, this.httpOptions).pipe(
      tap((response: RegisterResponse) => this.log(`added student w/ ${response.status}`)),
      catchError(this.handleError<RegisterResponse>('addStudent'))
    );
  }

  /** POST: add a student to Room */
  addStudentToRoom(userId: string, room: Room): Observable<Student> {
    return this.http.post<Student>(`/api/student/add-room/${userId}`, room, this.httpOptions).pipe(
      tap((newStudent: Student) => this.log(`added student w/ houseType=${this.houseTypes[newStudent.houseType]}`)),
      catchError(this.handleError<Student>('addStudent'))
    );
  }

  /** DELETE: delete the student from Hogwarts */
  deleteStudent(id: string): Observable<Student> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.delete<Student>(url, this.httpOptions).pipe(
      map(x => {
        if (id == this.userValue?.id){
          this.logout();
        }
        return x;
      }),
      tap(_ => this.log(`deleted student id=${id}`)),
      catchError(this.handleError<Student>('deleteStudent'))
    );
  }

  /** PUT: update the student */
  updateStudent(id: string, params: any): Observable<any> {
    const url = `${this.studentsUrl}/${id}`;
    return this.http.put(url, params, this.httpOptions).pipe(
      map(x => {
        if (id == this.userValue?.id) {
          const user = { ...this.userValue, ...params };
          localStorage.setItem('user', JSON.stringify(user));

          this.userSubject.next(user);
        }
        return x;
      }),
      tap(_ => this.log(`updated student id=${id}`))//,
      // catchError(this.handleError<any>('updateStudent'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a RoomService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`RoomService: ${message}`);
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at https://angular.io/license
*/
