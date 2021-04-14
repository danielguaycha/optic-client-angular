import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Modal} from 'bootstrap';

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  private subject = new Subject<any>();
  private modal: Modal;
  constructor() {
  }

  confirm(message: string, ok: () => void): any {
   this.modal = new Modal(document.getElementById('modalConfirm'), {
      keyboard: true
    });
    this.modal.show();
    this.setConfirmation(message, ok, null);
  }

  setConfirmation(message: string, yesFn: () => void, noFn: () => void): any {
    const that = this;
    this.subject.next({
      type: 'confirm',
      text: message,
      yesFn(): any {
        that.subject.next(); // This will close the modal
        that.modal.hide();
        yesFn();
      }
    });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

}
