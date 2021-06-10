import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { RolesModel } from '../models/roles.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  saveRoles(rolData: RolesModel): Observable<any> {
    return this.http.post('rols', rolData);
  }
  
  getPermissions(): Observable<any> {
    return this.http.get('permissions');
  }
}
