import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import { EnterpriseModel } from '../models/enterprise.model';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  constructor(private http: HttpClient) { }

  getEnterprise(): Observable<any> {
    return null;
    // return this.http.post('user', userData);
  }
}
