import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { UserModel } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  saveUser(userData: UserModel): Observable<any> {
    return this.http.post('user', userData);
  }

  listUsers(): Observable<any> {
    return this.http.get('users');
  }

  getUser(id): Observable<any> {
    let url = 'users/';
    return this.http.get(url + id);
  }

  deleteUser(id): Observable<any> {
    let url = 'users/';
    return this.http.delete(url + id);
  }
}
