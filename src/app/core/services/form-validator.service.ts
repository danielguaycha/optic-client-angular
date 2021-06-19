import { Injectable } from '@angular/core';
import {ToastService} from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  constructor(private toast: ToastService) {}

  public validate(data: Object, rules: Object, alias: Object = {}) {
    for (const [k, v] of Object.entries(rules)) {
      const value = data[k];
      const validations = v.split('|');
    }
  }

  private validateRules(key: string, value: any, rules: Array<string>, alias: Object = {}) {
    for (const rawRule of rules) {
      const regex = rawRule.split(':');
      const rule:string = regex[0];
      const second:string = regex[1];
      switch (rule.toLowerCase()) {
        case "required":
          if (!value) {
            this.toast.err(this.message(rule, key, alias));
          }
          break;
      }
    }
  }

  private message (rule:string, key:string, alias: Object = {}) {
      let keyAlias = key;
      if (alias[key]) { keyAlias = alias[key];}
      let msg = `El campo ${keyAlias}`;
      switch (rule.toLowerCase()) {
        case "required":
          return msg+=" es requerido";
      }
  }
}
