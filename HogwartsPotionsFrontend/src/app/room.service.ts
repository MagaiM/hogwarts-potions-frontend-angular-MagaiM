import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
import { Room } from './room';

@Injectable({ providedIn: 'root' })
export class RoomService {

  private roomsUrl = '/api/room';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET all rooms from the server */
  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.roomsUrl)
      .pipe(
        tap(_ => this.log('fetched all rooms')),
        catchError(this.handleError<Room[]>('getAllRooms', []))
      );
  }

  /** GET room by id. Return `undefined` when id not found */
  getRoomNo404<Data>(id: number): Observable<Room> {
    const url = `${this.roomsUrl}/?id=${id}`;
    return this.http.get<Room[]>(url)
      .pipe(
        map(rooms => rooms[0]), // returns a {0|1} element array
        tap(r => {
          const outcome = r ? 'fetched' : 'did not find';
          this.log(`${outcome} room id=${id}`);
        }),
        catchError(this.handleError<Room>(`getRoom id=${id}`))
      );
  }

  /** GET room by id. Will 404 if id not found */
  getRoom(id: number): Observable<Room> {
    const url = `${this.roomsUrl}/${id}`;
    return this.http.get<Room>(url).pipe(
      tap(_ => this.log(`fetched room id=${id}`)),
      catchError(this.handleError<Room>(`get id=${id}`))
    );
  }

//   /* GET heroes whose name contains search term */
//   searchHeroes(term: string): Observable<Hero[]> {
//     if (!term.trim()) {
//       // if not search term, return empty hero array.
//       return of([]);
//     }
//     return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
//       tap(x => x.length ?
//          this.log(`found heroes matching "${term}"`) :
//          this.log(`no heroes matching "${term}"`)),
//       catchError(this.handleError<Hero[]>('searchHeroes', []))
//     );
//   }

  //////// Save methods //////////

  /** POST: add a new room to Hogwarts */
  addRoom(room: Room): Observable<Room> {
    return this.http.post<Room>(this.roomsUrl, room, this.httpOptions).pipe(
      tap((newRoom: Room) => this.log(`added room w/ capacity=${newRoom.capacity}`)),
      catchError(this.handleError<Room>('addRoom'))
    );
  }

  /** DELETE: delete the room from Hogwarts */
  deleteRoom(id: number): Observable<Room> {
    const url = `${this.roomsUrl}/${id}`;
    console.log(url);
    return this.http.delete<Room>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted room id=${id}`)),
      catchError(this.handleError<Room>('deleteRoom'))
    );
  }

  /** PUT: update the room capacity in Hogwarts */
  updateRoom(room: Room): Observable<any> {
    const url = `${this.roomsUrl}/${room.id}`;
    return this.http.put(url, room, this.httpOptions).pipe(
      tap(_ => this.log(`updated room id=${room.id}`))//,
      // catchError(this.handleError<any>('updateRoom'))
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