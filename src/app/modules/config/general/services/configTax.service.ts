import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigTaxService {

  constructor(private http: HttpClient) {
  }

  saveConfg(data: any) : Observable<any> {
    return this.http.put('enterprise/config', data);
  }
}
