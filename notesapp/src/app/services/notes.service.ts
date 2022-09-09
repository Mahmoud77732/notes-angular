import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  baseUrl = "https://routeegypt.herokuapp.com";

  constructor(private _HttpClient : HttpClient) { }

  // post: https://routeegypt.herokuapp.com/getUserNotes

  getAllNotes(data : any) : Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/getUserNotes`, data);
  }

  addMyNote(data : any) : Observable<any>{
    return this._HttpClient.post(`${this.baseUrl}/addNote`, data);
  }

  editMyNote(data : any) : Observable<any>{
    return this._HttpClient.put(`${this.baseUrl}/updateNote`, data);
  }

  deleteMyNote(data : any) : Observable<any>{
    let options = {
      headers:new HttpHeaders({}),
      body: {
        NoteId: data.NoteID,
        token: data.token
      }
    };
    return this._HttpClient.delete(`${this.baseUrl}/deleteNote`, options);
  }

}
