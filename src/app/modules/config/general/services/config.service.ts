import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SecureStorageService } from '../../../auth/services/secure-storage.service';
import { ConfigModel } from '../models/config-general.model';

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
    return this.toFloat((total / (1 + (tarifaPercent / 100))));
  }

  addPercent(neto: number, tarifaPercent) {
    return this.toFloat(neto * (1 + (tarifaPercent / 100)));
  }

  saveConfg(data: ConfigModel): Observable<any> {
    let nameFaile = data.cdfi_signature.name.replace(" ","");
    let formData = new FormData();
    formData.append('iva', data.iva.toString());
    formData.append('decimals', data.decimals.toString());
    formData.append('cfdi_env', data.cfdi_env);
    formData.append('cdfi_wait_time', data.cdfi_wait_time);
    formData.append('cdfi_password', data.cdfi_password);
    formData.append('cdfi_signature', data.cdfi_signature, nameFaile);
    formData.append('cdfi_bussiness_key', data.cdfi_bussiness_key);
    formData.append('cdfi_cert_entity', data.cdfi_cert_entity);
    formData.append('cdfi_expiration', data.cdfi_expiration);
    return this.http.put('enterprise/config', data);
  }
}
