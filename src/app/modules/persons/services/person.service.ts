import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  getPersons(): Observable<any> {
    return this.http.get('person');
  }

  savePerson(data: any) : Observable<any> {
    return this.http.post('person', data);
  }

  getPerson(id) : Observable<any> {
    return this.http.get(`person/${id}`);
  }

  updatePerson(id, data) : Observable<any> {
    return this.http.put(`person/${id}`, data);
  }

  deletePerson(id) : Observable<any>{
    return this.http.delete(`person/${id}`);
  }
}
