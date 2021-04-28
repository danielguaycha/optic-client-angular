import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {Modal} from 'bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() title:string = environment.appName;
  @Input() idModal:string;
  @Input() showFooter:boolean = true;
  @Input() extraClass: string = '';
  @ViewChild('closebutton') closebutton;
  public appName: string
  constructor() {
    this.idModal = 'modal';
    this.appName = environment.appName;
  }

  ngOnInit(): void {}

  close() {
    this.closebutton.nativeElement.click();
  }

  open() {
    const modalEl = document.getElementById(this.idModal);
    const modal = new Modal(modalEl, {
      keyboard: true, focus: true
    });
    modal.show();
  }

}
