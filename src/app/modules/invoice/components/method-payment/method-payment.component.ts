import {Component, Input, OnInit} from '@angular/core';
import banks from '../../models/banks';
import typePayment from '../../models/type.payment';

@Component({
  selector: 'app-method-payment',
  templateUrl: './method-payment.component.html',
})
export class MethodPaymentComponent implements OnInit {

  @Input() selectedPay:string = '20';
  @Input() totalAPagar: any = 0;

  banks = banks;
  typePayments: Array<any>;

  payments = [];
  constructor() {
    this.typePayments = typePayment;
  }

  ngOnInit(): void {
  }

  addPayMethod() {
    this.payments.push({
      type: this.selectedPay,
      bank: '',
      desc: '',
      value: 0
    });
  }

}
