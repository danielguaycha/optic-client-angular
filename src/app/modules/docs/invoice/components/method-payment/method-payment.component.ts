import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import banks from '../../models/banks';
import typePayment from '../../models/type.payment';
import {ValidateService} from '../../../../../core/services/validate.service';
import {Modal} from 'bootstrap';
import {ModalComponent} from '../../../../../core/components/modal/modal.component';

@Component({
  selector: 'app-method-payment',
  templateUrl: './method-payment.component.html',
})
export class MethodPaymentComponent implements OnInit {
  @ViewChild(ModalComponent) ModalCmp;
  @Output() onComplete: EventEmitter<any> = new EventEmitter<any>();
  @Input() selectedPay:number | string = 2;
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
    this.close()
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
      if (payType.id == id) {
        return payType;
      }
    }
    return null;
  }

  // opening
  open(typePayment: string | number = 1) {
    this.ModalCmp.open();
    if (typePayment != 1 && typePayment != 7) {
      this.selectedPay = `${typePayment}`;
      this.payments = [];
      this.addPayMethod();
    } else {
      document.getElementById('modalPayments').addEventListener('shown.bs.modal', function (event) {
        document.getElementById('totalPay').focus();
      });
    }
  }

  close() {
    this.ModalCmp.close();
    this.selectedPay = 1;
    this.payments = [];
    this.totalPay = 0;
    this.change = 0;
    this.total = 0;
  }
}

