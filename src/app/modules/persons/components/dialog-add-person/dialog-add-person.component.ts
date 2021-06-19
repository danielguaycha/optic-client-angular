import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from '../../../../core/components/modal/modal.component';

@Component({
  selector: 'app-add-client',
  templateUrl: './dialog-add-person.component.html',
})
export class DialogAddPersonComponent implements OnInit {
  @ViewChild(ModalComponent) child:ModalComponent;

  @Input() provider: boolean = false
  @Output() create : EventEmitter<any> = new EventEmitter<any>();
  @Input() formData: any = {};

  public title: string;
  constructor() { }

  ngOnInit(): void {
    this.provider? this.title = "Agregar Proveedor" : this.title = "Agregar Cliente";
  }

  onCreateClient(event) {
    this.create.emit(event);
    this.child.close();
  }

  open() {
    this.child.open();
  }
}
