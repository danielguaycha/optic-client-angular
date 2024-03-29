import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuyService {

  constructor(private http: HttpClient) {}

  public loadKeyAccess(keyAccess: string) : Observable<any> {
    return this.http.get(`invoice/sri/?key=${keyAccess}`);
  }
}
