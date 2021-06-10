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
  @Input() secondary: boolean = false;
  @ViewChild('closebutton') closebutton;
  public appName: string
  private modal;
  constructor() {
    this.idModal = 'modal';
    this.appName = environment.appName;
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    this.getModal();
  }

  getModal() {
    const el = document.getElementById(this.idModal);
    if (el)
      this.modal = new Modal(el, {
        keyboard: false
      });
  }

  getInstance() {
    const myModalEl = document.getElementById(this.idModal)
    this.modal = Modal.getInstance(myModalEl)
  }

  close() {
    this.getInstance();
    this.modal.hide();
  }

  open() {
    this.modal.show();
  }

}
