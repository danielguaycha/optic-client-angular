import {Component, Input, OnInit} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() title:string = environment.appName;
  @Input() idModal:string;
  constructor() {
    this.idModal = 'modal';
  }

  ngOnInit(): void {
    console.log(this.idModal);
  }

}
