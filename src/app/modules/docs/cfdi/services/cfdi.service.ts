import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CfdiModel} from '../models/cfdi.model';
import {Observable} from 'rxjs';
import {AuthService} from '../../../auth/services/auth.service';
import {environment} from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CfdiService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  getDocuments(model: CfdiModel) : Observable<any> {
    let params = new HttpParams()
      .set('docType', model.docType.toString())
      .set('dateInit', model.dateInit );

    if (model.dateEnd) params = params.set('dateEnd', model.dateEnd);
    if (model.ruc) params = params.set('ruc', model.ruc)
    if (model.docId) params = params.set('docId', model.docId.toString())
    if (model.docStatus) params = params.set('docStatus', model.docStatus.toString())

    return this.http.get(`cfdi/documents`, {params});
  }

  invoiceAuth(invoiceId) : Observable<any> {
    return this.http.post(`invoice/auth/${invoiceId}`, {});
  }

  invoiceVerify(invoiceId) : Observable<any> {
    return this.http.get(`invoice/verify/${invoiceId}`);
  }

  verifyKeyAccess(keyAccess: string) : Observable<any> {
    return this.http.get(`invoice/verify/key-access?key=${keyAccess}`);
  }

  getDocFromSRI (keyAccess: string) : Observable<any> {
    return this.http.get(`invoice/sri/?key=${keyAccess}`);
  }

  // documents view
  getIRide(docId: number) {
    return `${environment.apiUrl}/ride/${docId}?token=${this.authService.getToken()}`;
  }

  getXML(docId: number) {
    return `${environment.apiUrl}/xml/${docId}?token=${this.authService.getToken()}`;
  }
}
