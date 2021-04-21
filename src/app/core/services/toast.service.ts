import { Injectable } from '@angular/core';
import {Toaster} from 'ngx-toast-notifications';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toaster: Toaster) { }

  ok(message = 'Ok, proceso completado con éxito') {
    this.toaster.open({
      text: message,
      caption: `${environment.appName} :: Proceso exitoso`,
      type: 'success',
    });
  }

  err(message = 'Error al procesar la petición', title = 'Error al procesar') {
    this.toaster.open({
      text: message,
      caption: `${environment.appName} :: ${title}`,
      type: 'danger',
    });
  }

  info(message = 'Comprueba tus datos', title = 'Dato informativo') {
    this.toaster.open({
      text: message,
      caption: `${environment.appName} :: ${title}`,
      type: 'info',
    });
  }

  warn(message = 'Comprueba tus datos', title = 'Dato informativo') {
    this.toaster.open({
      text: message,
      caption: `${environment.appName} :: ${title}`,
      type: 'warning',
    });
  }
}
