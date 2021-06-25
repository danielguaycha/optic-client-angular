import { Component, OnInit } from '@angular/core';
import {InvoiceModel} from '../../../invoice/models/invoice.model';
import {ArticleService} from '../../../../inventory/articles/services/articles.service';
import {NoteCreditService} from '../../services/note-credit.service';
import {NoteCreditModel} from '../../models/note_credit.model';
import {ValidateService} from '../../../../../core/services/validate.service';
import * as moment from 'moment';

@Component({
  selector: 'app-create-note-credit',
  templateUrl: './create-note-credit.component.html',
})
export class CreateNoteCreditComponent implements OnInit {
  invoice: InvoiceModel;
  formData: NoteCreditModel;
  dateNow: string;

  constructor(
      private articleServices: ArticleService,
      private noteCreditService: NoteCreditService,
      public validate: ValidateService ) {
    this.invoice = {
      client_id: 0,
      details: [],
      discount: 0,
      id: 0, iva: 0,
      number: '', subtotal0: 0, subtotalIva: 0
    };
    this.dateNow = moment(new Date()).format('YYYY-MM-DD');
    console.log(this.dateNow);
  }

  ngOnInit(): void {
    this.clearTotals();
  }

  onSelectInvoice(invoice): void {
    this.invoice = invoice;
    console.log(this.invoice.details.length);

    for (let i = 0; i < this.invoice.details.length; i++){
      this.invoice.details[i].qty_note_credit = this.invoice.details[i].qty;
      this.invoice.details[i] = this.calcDetail(i);
    }
    this.calcTotalNoteCredit();
  }
  clearTotals(): void{
    this.invoice.subtotal = 0;
    this.invoice.discount = 0;
    this.invoice.base = 0;
    this.invoice.subtotal0 = 0;
    this.invoice.subtotalIva = 0;
    this.invoice.iva_valor = 0;
    this.invoice.total = 0;
  }

  onChangeEventCalcDetail(event: any, index): void {
    this.invoice.details[index] = this.calcDetail(index);
    this.calcTotalNoteCredit();
  }

  calcDetail(index): any{
    let detail = this.invoice.details[index];
    if (detail.qty_note_credit > detail.qty){
      detail.qty_note_credit = detail.qty;
    }else if (detail.qty_note_credit < 0 ){
      detail.qty_note_credit = 0;
    }
    detail.subtotal = detail.qty_note_credit * detail.pvp;
    detail.base = detail.subtotal - detail.discount;
    detail.iva_value = ((detail.iva === 1) ? this.invoice.iva_percent / 100 : 0) * detail.base ;
    detail.total = detail.iva_value + detail.subtotal;
    return detail;
  }

  calcTotalNoteCredit(): void{
    this.clearTotals();
    this.invoice.details.forEach(detail => {
      this.invoice.subtotal += detail.subtotal;
      this.invoice.discount += detail.discount;
      this.invoice.base += detail.base;
      if ( detail.iva === 1){
        this.invoice.subtotalIva += detail.base;
        this.invoice.iva_valor += detail.base * this.invoice.iva_percent / 100;
      }else{
        this.invoice.subtotal0 += detail.base;
      }
    });
    this.invoice.total = this.invoice.subtotal0 + this.invoice.subtotalIva + this.invoice.iva_valor;
  }

  onSave(): void{
    this.formData.invoice_id = this.invoice.id;

    this.formData.iva = this.invoice.iva;
    this.formData.invoice_id = this.invoice.id;
    this.formData.invoice_id = this.invoice.id;
    this.formData.invoice_id = this.invoice.id;

    this.noteCreditService.store(this.formData);
  }
}


