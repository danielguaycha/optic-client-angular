import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import typePayment from '../../invoice/models/type.payment';

@Component({
  selector: 'app-invoice-buys',
  templateUrl: './invoice-buys.component.html'
})

export class InvoiceBuysComponent implements OnInit {
    public formData;
    typePayments: Array<any> = [];

    ngOnInit(){
    this.typePayments = typePayment;
    }
}