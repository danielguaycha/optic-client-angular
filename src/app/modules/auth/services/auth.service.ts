import { Injectable } from '@angular/core';
import {SecureStorageService} from './secure-storage.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  storageService: SecureStorageService;
  constructor(storageService: SecureStorageService, public http: HttpClient) {
    this.storageService = storageService;
  }

  login(data: any) : Observable<any> {
    return this.http.post(`login`, data);
  }

  getToken () {
    return this.storageService.get('token');
  }

  removeToken() {
    this.storageService.remove('token');
  }

  setToken(token:string) {
    this.storageService.set('token', token);
  }
}
