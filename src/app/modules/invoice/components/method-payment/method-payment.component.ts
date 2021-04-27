import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import banks from '../../models/banks';
import typePayment from '../../models/type.payment';
import {ValidateService} from '../../../../core/services/validate.service';

@Component({
  selector: 'app-method-payment',
  templateUrl: './method-payment.component.html',
})
export class MethodPaymentComponent implements OnInit {
  @Output() onComplete: EventEmitter<any> = new EventEmitter<any>();
  @Input() selectedPay:number = 2;
  @Input() totalAPagar: any = 0;

  banks = banks;
  typePayments: Array<any>;
  change:number = 0;

  total: number = 0;
  totalPay: number = 0; //pagado por el cliente
  payments = [];
  constructor(public validate: ValidateService) {
    this.typePayments = typePayment.filter(pay => {
      return pay.text !=='Efectivo' && pay.text !== 'Crédito';
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    this.calc();
    let formatPays = [];
    for (let p of this.payments) { // para todos los pagos que no son efectivos, o creditos
      const tp = this.getPaymentById(p.code);
      if (tp) {
        formatPays.push({
          code: tp.code,
          name: tp.text,
          desc: p.desc,
          extraInfo: p.bank,
          total: p.total
        });
      }
    }

    if (this.totalPay > 0) { // para efectivo
      const tp = this.getPaymentById(1);
      formatPays.push({
        code: tp.code,
        name: tp.text,
        desc: '',
        extraInfo: '',
        total: this.totalPay
      })
    }

    this.onComplete.emit(formatPays);
  }

  addPayMethod() {
    this.payments.push({
      code: this.selectedPay,
      bank: '',
      desc: '',
      total: 0
    });
    this.calc();
  }

  removePayMethod(index){
    if (index >= 0) {
      this.payments.splice(index, 1);
      this.calc();
    }
  }

  calc() {
    this.total=0;
    for (let pay of this.payments) {
      this.total+= pay.total;
    }
    this.total+= this.totalPay;
    if (this.total >= this.totalAPagar) {
      this.change = this.total - this.totalAPagar;
    }
  }

  getPaymentById(id: number) {
    for(let payType of typePayment) {
      if (payType.id === id) {
        return payType;
      }
    }
    return null;
  }
}

