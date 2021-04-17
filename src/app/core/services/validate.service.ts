import { Injectable } from '@angular/core';
import {ConfigService} from '../../modules/config/general/services/config.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor(private cfg: ConfigService) { }

  //number functions

  round(number: any) {
    return this.roundToPlaces(number, this.cfg.decimals);
  }

  toIntDefault(number: any, default_: number = 0) {
    try {
      return Number.parseInt(number);
    } catch (e) {
      return default_
    }
  }

  roundToPlaces(number:any, places:number = 2){
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
    return this.round(valueNeto * (1 + (tarifa/100)));
  }

  calcPercent(valueNeto: number, tarifa: number) {
    return this.round(valueNeto * (tarifa/100));
  }

  getNeto(total: number, tarifaPercent: number) {
    return this.round(total / (1 + (tarifaPercent/100)));
  }

}
