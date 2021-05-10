import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http: HttpClient) { }

  getPersons(search:string = '', provider: boolean = false): Observable<any> {
    let url = `person?`;
    if (provider) {
      url+=`providers=true`;
    }
    if (search.trim().length > 0) {
      url+=`search=${search}`
    }
    return this.http.get(url);
  }

  savePerson(data: any) : Observable<any> {
    return this.http.post('person', data);
  }

  getPerson(id: string, provider: boolean = false) : Observable<any> {
    let url = `person/${id}?`;
    if (provider) {
      url+=`providers=true`;
    }
    return this.http.get(url);
  }

  updatePerson(id, data) : Observable<any> {
    return this.http.put(`person/${id}`, data);
  }

  deletePerson(id) : Observable<any>{
    return this.http.delete(`person/${id}`);
  }
}
