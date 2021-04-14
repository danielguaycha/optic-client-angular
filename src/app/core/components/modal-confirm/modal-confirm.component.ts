import { Component, OnInit } from '@angular/core';
import {ConfirmService} from '../../services/confirm.service';


@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
})
export class ModalConfirmComponent implements OnInit {
  message: any;
  constructor(private confirm: ConfirmService) {

  }

  ngOnInit(): void {
    this.confirm.getMessage().subscribe(message => {
      this.message = message;
    });
  }
}
