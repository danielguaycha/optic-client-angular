import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OptometryService {

  constructor(private http: HttpClient) { }

  getClinicalFiles(search: string = ''): Observable<any> {
    let url = `medical/optometry?`;
    if (search.trim().length > 0) {
      url += `search=${search}`;
    }
    return this.http.get(url);
  }

  store(data: any): Observable<any> {
    return this.http.post(`medical/optometry`, data);
  }

  update(data: any): Observable<any> {
    return this.http.put(`medical/optometry/` + data.integral_rxs_id, data);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`medical/optometry/` + id);
  }

}
