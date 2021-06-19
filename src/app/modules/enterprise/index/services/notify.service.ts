import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private http: HttpClient) { }

  public getNotifies() : Observable<any>  {
    return this.http.get(`notifications`);
  }

  public removeNotify(id) : Observable<any> {
    return this.http.delete(`notifications/${id}`);
  }
}
