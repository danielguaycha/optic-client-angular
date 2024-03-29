import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
formData.authorization == null ? formData.authorization = "" : null;
formData.special_contrib == null ? formData.special_contrib = "" : null;
formData.retention_agent == null ? formData.retention_agent = "" : null;
    const form = new FormData();
    form.append('ruc', formData.ruc);
    form.append('name', formData.name);
    form.append('business_name', formData.business_name);
    form.append('address', formData.address);
    form.append('email', formData.email);
    form.append('authorization', formData.authorization);
    form.append('special_contrib', formData.special_contrib);
    form.append('retention_agent', formData.retention_agent);
    form.append('accounting', formData.accounting);
    form.append('micro_enterprise', formData.micro_enterprise);
    form.append('last_connection', formData.last_connection);
    form.append('codEst', formData.codEst);
    form.append('addressEst', formData.addressEst);
    form.append('ptoEmi', formData.ptoEmi);

    if (formData.logo && typeof(formData.logo) != "string") {
        let nameFaile = formData.logo.name.replace(" ","");
        nameFaile = nameFaile.replace("_","");
        form.append('logo', formData.logo, nameFaile);
    }
    return this.http.post(`enterprises/${formData.id}`, form);
  }

  getLogo(logo: string): Observable<any>{
    return this.http.get(`image?path=/${logo}`);
    // return `${environment.url}/img/logo/${logo}`
  }
}
