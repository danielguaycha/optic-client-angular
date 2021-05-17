import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SecureStorageService } from '../../../auth/services/secure-storage.service';
import { ConfigModel } from '../models/config-general.model';
import {ToastService} from '../../../../core/services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  [x: string]: any;

  public iva: number
  public decimals: number;
  public cfdi_env: number;
  public cfdi_send_mail: number;
  public cfdi_sign_entity: string;
  public cfdi_sign_expire: string;
  public cfdi_business_key: string;
  public config: any;
  constructor(private storage: SecureStorageService,
              private http: HttpClient,
              private toast: ToastService) {

    const rawCfg = this.storage.get('config');
    if (rawCfg && rawCfg !== 'null') {
      this.config = JSON.parse(rawCfg);
      this.iva = this.config.iva;
      this.decimals = this.config.decimals;
      this.cfdi_env = this.config.cfdi_env;
      this.cfdi_send_mail = this.config.cfdi_send_mail;
      this.cfdi_sign_entity = this.config.cfdi_sign_entity;
      this.cfdi_sign_expire = this.config.cfdi_sign_expire;
      this.cfdi_business_key = this.config.cfdi_business_key;
    } else {
      this.iva = 12;
      this.decimals = 2
      this.toast.info(`No se han establecido las configuraciones de la empresa, usando IVA(${this.iva}),
              DECIMALES(${this.decimals}) por defecto`);
    }
  }
  /**
   * @deprecated parse to ValidateService
   */
  toFloat(number: any) {
    if (typeof number === 'string') {
      return Number.parseFloat(number).toFixed(this.decimals);
    }
    return number.toFixed(this.decimals);
  }
  /**
   * @deprecated parse to ValidateService
   */
  getNeto(total: number, tarifaPercent: number) {
    return this.toFloat((total / (1 + (tarifaPercent / 100))));
  }
  /**
   * @deprecated parse to ValidateService
   */
  addPercent(neto: number, tarifaPercent) {
    return this.toFloat(neto * (1 + (tarifaPercent / 100)));
  }

  saveConfg(data: ConfigModel): Observable<any> {
    let formData = new FormData();
    data.iva != null ? formData.append('iva', data.iva.toString()) : null;
    data.decimals != null ? formData.append('decimals', data.decimals.toString()) : null;
    data.cfdi_sign_expire != null ? formData.append('cfdi_sign_expire', data.cfdi_sign_expire) : null;
    data.cfdi_business_key != null ? formData.append('cfdi_business_key', data.cfdi_business_key): null;
    data.cfdi_env != null ? formData.append('cfdi_env', data.cfdi_env.toString()): null;
    data.cfdi_send_mail != null ? formData.append('cfdi_send_mail', data.cfdi_send_mail.toString()): null;
    data.cfdi_wait != null ? formData.append('cdfi_wait', data.cfdi_wait.toString()): null;
    data.cfdi_sign_entity != null ? formData.append('cfdi_sign_entity', data.cfdi_sign_entity): null;

    if(data.cfdi_sign != null){
      let nameFaile = data.cfdi_sign.name.replace(" ","");
      formData.append('cfdi_sign', data.cfdi_sign, nameFaile);
    }
    console.log(formData);
    return this.http.post('enterprise/config', formData);
  }

  getConfig() : Observable<any> {
    return this.http.get('enterprise/config');
  }
}
