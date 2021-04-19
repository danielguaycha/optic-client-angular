import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from '../../../../../core/components/modal/modal.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './dialog-add-product.component.html',
})
export class DialogAddProductComponent implements OnInit {

  @Output() create : EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(ModalComponent) child:ModalComponent;
  constructor() { }

  ngOnInit(): void {
  }

  onCreateProduct(event) {
    this.create.emit(event);
    this.child.close();
  }
}
