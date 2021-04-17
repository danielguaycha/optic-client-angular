import { Injectable } from '@angular/core';
import {SecureStorageService} from '../../../auth/services/secure-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  public iva: number
  public decimals: number;
  public config: any;
  constructor(private storage: SecureStorageService) {
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
}
