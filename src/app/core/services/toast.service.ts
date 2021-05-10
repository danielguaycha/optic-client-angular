import { Injectable } from '@angular/core';
import {Toaster} from 'ngx-toast-notifications';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toaster: Toaster) { }

  ok(message = 'Ok, proceso completado con éxito') {
    this.alert(message, 'Proceso exitoso', 'success');
  }

  err(message = 'Error al procesar la petición', title = 'Error al procesar') {
    this.alert(message, title, 'danger')
  }

  info(message = 'Comprueba tus datos', title = 'Dato informativo') {
    this.alert(message, title, 'info')
  }

  warn(message = 'Comprueba tus datos', title = 'Dato informativo') {
   this.alert(message, title, 'warning');
  }

  alert(message:string, title:string,  type:any = 'success') {
    this.toaster.open({
      text: message,
      caption: `${environment.appName} :: ${title}`,
      type: type,
      preventDuplicates: true
    });
  }
}
