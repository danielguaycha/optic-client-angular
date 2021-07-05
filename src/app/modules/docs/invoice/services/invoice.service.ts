import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private http: HttpClient) { }

  store(data: any): Observable<any> {
    return this.http.post(`invoice`, data);
  }

  search(query: string) : Observable<any> {
    return this.http.get(`invoice/find?search=${query}`);
  }

  show(id: number) : Observable<any> {
    return this.http.get(`invoice/${id}`);
  }
}
