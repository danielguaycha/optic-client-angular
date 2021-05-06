import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnterpriseModel } from '../models/enterprise.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseService {

  constructor(private http: HttpClient) { }

  getEnterprise(id: number): Observable<any> {
    return this.http.get(`enterprises/${id}`);
  }

  updateEnterprise(formData: EnterpriseModel): Observable<any> {
    return this.http.post(`enterprises/${formData.id}`, formData);
  }

  getLogo(logo: string) {
    return `${environment.url}/img/logo/${logo}`
  }
}
