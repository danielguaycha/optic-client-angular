import { Component, OnInit } from '@angular/core';
import {InvoiceModel} from '../../../invoice/models/invoice.model';
import {ArticleService} from '../../../../inventory/articles/services/articles.service';
import {NoteCreditService} from '../../services/note-credit.service';
import {DetailNoteCreditModel, NoteCreditModel} from '../../models/note_credit.model';
import {ValidateService} from '../../../../../core/services/validate.service';
import * as moment from 'moment';
import {ToastService} from '../../../../../core/services/toast.service';

@Component({
  selector: 'app-create-note-credit',
  templateUrl: './create-note-credit.component.html',
})
export class CreateNoteCreditComponent implements OnInit {
  invoice: InvoiceModel;
  formData: NoteCreditModel;
  detailsFormData: Array<DetailNoteCreditModel>;
  dateNow: string;
  loader: boolean;

  constructor(
      private toast: ToastService,
      private articleServices: ArticleService,
      private noteCreditService: NoteCreditService,
      public validate: ValidateService ) {
    this.invoice = {
      client_id: -1,
      details: [],
      discount: 0,
      id: -1, iva: 0,
      number: '', subtotal0: 0, subtotalIva: 0
    };
    this.formData = {
      date: '',
      iva: 0,
      discount: 0,
      subtotalIva: 0,
      invoice_id: -1,
      subtotal0: 0,
      iva_percent: 0,
      observation: '',
      articles: new Array<DetailNoteCreditModel>(),
    };
    this.dateNow = moment(new Date()).format('YYYY-MM-DD');
    this.loader = false;
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
    this.loader = true;
    if (this.invoice.id === -1) {
      this.toast.err('No ha seleccionado una factura para realizar la Nota de Crédito');
      return ;
    }
    this.formData.invoice_id = this.invoice.id;
    this.formData.date = this.dateNow;
    this.formData.iva = this.invoice.iva_valor;
    this.formData.iva_percent = this.invoice.iva_percent;
    this.formData.subtotal0 = this.invoice.subtotal0;
    this.formData.subtotalIva = this.invoice.subtotalIva; 
    this.formData.discount = this.invoice.discount;
    this.formData.articles = [];
    this.invoice.details.forEach(detail => {
      this.formData.articles.push({
        qty: detail.qty_note_credit,
        pvp: detail.total,
        article_id: detail.article_id
      });
    });

    this.noteCreditService.store(this.formData).subscribe(res => {
      if (res.ok) {
        this.toast.ok(res.message);
        this.ngOnInit();
      }
      this.loader = false;
    }, error => {
      this.loader = false;
      this.toast.err(error);
    });
  }
}


