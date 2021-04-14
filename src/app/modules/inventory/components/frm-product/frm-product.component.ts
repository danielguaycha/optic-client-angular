import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-frm-client',
  templateUrl: './frm-product.component.html',
})
export class FrmProductComponent implements OnInit {

  @Output() create: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  ngOnInit(): void {
  }

  onSubmit() {      
  }
}
