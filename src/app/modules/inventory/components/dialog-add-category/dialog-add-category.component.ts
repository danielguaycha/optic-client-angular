import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from '../../../../core/components/modal/modal.component';

@Component({
  selector: 'app-add-category',
  templateUrl: './dialog-add-category.component.html',
})
export class DialogAddCategoryComponent implements OnInit {

  @Output() create : EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(ModalComponent) child:ModalComponent;
  constructor() { }

  ngOnInit(): void {
  }

  onCreateCategory(event) {
    this.create.emit(event);
    this.child.close();
  }
}
