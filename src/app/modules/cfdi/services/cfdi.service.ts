import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {CfdiModel} from '../models/cfdi.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CfdiService {

  constructor(private http: HttpClient) { }

  getDocuments(model: CfdiModel) : Observable<any> {
    const params = new HttpParams()
      .set('docType', model.docType.toString() )
      .set('dateInit', model.dateInit );

    if (model.dateEnd) params.set('dateEnd', model.dateEnd)
    if (model.ruc) params.set('ruc', model.dateEnd)
    if (model.docId) params.set('docId', model.dateEnd)
    if (model.docStatus) params.set('dateEnd', model.docStatus.toString())

    return this.http.get(`cfdi/documents`, {params});
  }

  invoiceAuth(invoiceId) : Observable<any> {
    return this.http.post(`invoice/auth/${invoiceId}`, {});
  }

  invoiceVerify(invoiceId) : Observable<any> {
    return this.http.get(`invoice/verify/${invoiceId}`);
  }

  verifyKeyAccess(keyAccess: string) : Observable<any> {
    return this.http.get(`invoice/verify?key=${keyAccess}`);
  }

  getDocFromSRI (keyAccess: string) : Observable<any> {
    return this.http.get(`invoice/sri/?key=${keyAccess}`);
  }

}
