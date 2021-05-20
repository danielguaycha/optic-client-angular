import { Injectable } from '@angular/core';
import {SecureStorageService} from './secure-storage.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Store} from '@ngrx/store';
import {addConfig, addUser} from '../store/user.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  storageService: SecureStorageService;
  public storeData: any;
  constructor(storageService: SecureStorageService, public http: HttpClient,
              private store: Store<{ data: any, user: any, perms:any, config:any  }>) {
    this.storageService = storageService;
    this.storeData = this.store;
  }

  login(data: any) : Observable<any> {
    return this.http.post(`login`, data);
  }

  getUser() : Observable<any>{
    return this.http.get('user');
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

  logout() {
    this.removeToken();
    localStorage.clear();
  }

  getLoginUser() {
    const auth = !!this.getToken();
    if(!auth) return;
    this.getUser().subscribe(res => {
      if (res.ok) {
        this.store.dispatch(addUser({ user: res.body.user }));
        this.store.dispatch(addConfig({ cfg: res.body.config }));
        this.storageService.set('config', JSON.stringify(res.body.config));
      }
    }, error => {
      // console.log(error);
    })
  }
}
