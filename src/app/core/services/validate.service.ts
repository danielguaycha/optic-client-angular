import { Injectable } from '@angular/core';
import {ConfigService} from '../../modules/enterprise/config/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor(private cfg: ConfigService) { }

  //number functions

  round(number: any, useConfig: boolean = true) {
    if (useConfig)
      return this.roundTo(number, this.cfg.decimals);

    return this.roundTo(number, 6);
  }

  toIntDefault(number: any, default_: number = 0) {
    try {
      return Number.parseInt(number);
    } catch (e) {
      return default_
    }
  }

  roundTo(number:any, places:number = 6){
    if (typeof number === 'string') {
      return Number.parseFloat(number).toFixed(places);
    }
    return number.toFixed(places);
  }

  setSequence(cod:any, limit:number) {
    let generated = "";
    for (let i=cod.toString().length; i<limit; i++)
      generated+="0";
    return generated+cod;
  }

  // percent calc
  addPercent(valueNeto: number, tarifa: number) {
    return (valueNeto * (1 + (tarifa/100)));
  }

  calcPercent(valueNeto: number, tarifa: number) {
    return (valueNeto * (tarifa/100));
  }

  getNeto(total: number, tarifaPercent: number) {
    return (total / (1 + (tarifaPercent/100)));
  }

  getPercent(total: number, valueNeto: number) {
    return ((total / valueNeto) - 1) * 100;
  }

  // parse
  parseDouble (number: any) {
    return Number.parseFloat(number);
  }
}
