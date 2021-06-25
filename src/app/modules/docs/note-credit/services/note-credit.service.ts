import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteCreditService {

  constructor(private http: HttpClient) { }

  store(data: any): Observable<any>{
    return this.http.post('note_credit', data);
  }

}
