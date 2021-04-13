import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from '../../../../core/components/modal/modal.component';

@Component({
  selector: 'app-add-client',
  templateUrl: './dialog-add-client.component.html',
})
export class DialogAddClientComponent implements OnInit {

  @Output() create : EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(ModalComponent) child:ModalComponent;
  constructor() { }

  ngOnInit(): void {
  }

  onCreateClient(event) {
    this.create.emit(event);
    this.child.close();
  }

}
