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
    let formData = new FormData();
    formData.append('iva', data.iva.toString());
    formData.append('decimals', data.decimals.toString());
    formData.append('cfdi_sign_expire', data.cfdi_sign_expire);
    formData.append('cfdi_business_key', data.cfdi_business_key);
    formData.append('cfdi_env', data.cfdi_env.toString());
    formData.append('cfdi_send_mail', data.cfdi_send_mail.toString());
    formData.append('cdfi_wait', data.cdfi_wait.toString());
    formData.append('cfdi_sign_entity', data.cfdi_sign_entity);

    if(data.cfdi_sign != null){
      let nameFaile = data.cfdi_sign.name.replace(" ","");
      formData.append('cfdi_sign', data.cfdi_sign, nameFaile);
    }
    return this.http.post('enterprise/config', formData);
  }
}
