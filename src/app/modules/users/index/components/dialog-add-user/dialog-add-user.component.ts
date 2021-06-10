import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ModalComponent } from 'src/app/core/components/modal/modal.component';

@Component({
    selector: 'dialog-add-user',
    templateUrl: './dialog-add-user.component.html',
})
export class DialogAddUser implements OnInit {
    @Output() create : EventEmitter<any> = new EventEmitter<any>();
    @ViewChild(ModalComponent) child:ModalComponent;
    constructor(){}
    ngOnInit(): void { }
    onCreateClient(event) {
        this.create.emit(event);
        this.child.close();
      }
}
