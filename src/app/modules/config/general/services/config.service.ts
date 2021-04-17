import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {SecureStorageService} from '../../../auth/services/secure-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  [x: string]: any;

  public iva: number
  public decimals: number;
  public config: any;
  constructor(private storage: SecureStorageService, private http: HttpClient) {
    const rawCfg = this.storage.get('config');
    if (rawCfg) {
      this.config = JSON.parse(rawCfg);
      this.iva = this.config.iva;
      this.decimals = this.config.decimals;
    } else {
      this.iva = 12;
      this.decimals = 2
    }
  }

  toFloat(number: any) {
    if (typeof number === 'string') {
      return Number.parseFloat(number).toFixed(this.decimals);
    }
    return number.toFixed(this.decimals);
  }

  getNeto(total: number, tarifaPercent: number) {
    return this.toFloat((total / (1 + (tarifaPercent/100))));
  }

  addPercent(neto: number, tarifaPercent) {
    return this.toFloat(neto * (1 + (tarifaPercent/100)));
  }

  saveConfg(data: any) : Observable<any> {
    return this.http.put('enterprise/config', data);
  }
}
