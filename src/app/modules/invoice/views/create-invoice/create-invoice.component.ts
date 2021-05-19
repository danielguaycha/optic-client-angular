import {Component, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';

import {ToastService} from '../../../../core/services/toast.service';
import {SelectProductComponent} from '../../../inventory/articles/components/select-product/select-product.component';
import {ValidateService} from '../../../../core/services/validate.service';
import {ConfigService} from '../../../config/general/services/config.service';
import typePayment from '../../models/type.payment';
import {MethodPaymentComponent} from '../../components/method-payment/method-payment.component';
import {InvoiceService} from '../../services/invoice.service';
import {Store} from '@ngrx/store';
import {addTitle} from '../../../auth/store/user.actions';
import {SequencesService} from '../../../config/general/services/sequences.service';
import {Sequence} from '../../../config/general/models/sequence.model';

// @ts-ignore
@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
})
export class CreateInvoiceComponent implements OnInit {
  @ViewChild(SelectProductComponent) SelectArticleCmp;
  @ViewChild(MethodPaymentComponent) MethodPaymentCmp;

  articles: Array<any>;
  formData: any;
  //calculates
  subtotal0: number;
  subtotal12: number;
  descuento: number;
  iva12: number;
  total: number;
  typePayments: Array<any> = [];
  loader: boolean = false;
  sequence: string = "001-001-00000001";
  constructor(private toast: ToastService, public validate: ValidateService,
              public cfg: ConfigService, private seqService: SequencesService,
              private invService: InvoiceService, private store: Store) {

    this.typePayments = typePayment;
    this.store.dispatch(addTitle({ title: "Ventas"}));
  }

  ngOnInit(): void {
    this.initComponents();
  }

  submit(methodsPayments) {
    if (methodsPayments.length <= 0) {
      this.toast.err('Seleccione un método de pago');
      return;
    }
    this.MethodPaymentCmp.close();

    let data = {
      date: this.formData.date,
      client_id: this.formData.client_id,
      subtotal0: this.subtotal0,
      subtotalIva: this.subtotal12,
      iva: this.iva12,
      discount: this.descuento,
      iva_percent: this.cfg.iva,
      pto_emi: 1,
      articles: [],
      payments: methodsPayments
    };
    // prebuild products
    for (let art of this.articles) {
      data.articles.push({
        article_id: art.id,
        qty: art.qty,
        pvp: art.pvp,
        iva: art.iva
      });
    }
    this.loader = true;
    this.invService.store(data).subscribe(res => {
      if (res.ok) {
        this.toast.ok(res.message);
        this.initComponents();
      }
      this.loader = false;
    }, error => {
      this.loader = false;
      this.toast.err(error);
    });
  }

  //confirm payments
  confirmPayment() {
    if (!this.validFrm()) { return; }
    this.MethodPaymentCmp.open(this.formData.methodPay);
  }

  // get seq
  getSeq() {
    this.seqService.getByType(Sequence.SEQ_INVOICE).subscribe(res => {
      if (res.ok) {
        this.sequence = res.body;
      }
    })
  }

  //events
  onSelectPerson(person){
    this.formData.client_id = person.id;
  }

  //events
  onAddArticle(article: any) {
    if (article.qty > article.stock && article.type === 'PRODUCTO') { // verify stock
      this.toast.warn(`La cantidad ingresada (${article.qty}) es mayor al stock (${article.stock}), articulo (Cod=${article.code}) `);
      return;
    }
    if (this.getAddedArticle(article.id)) { // verify added
      this.toast.warn('Este artículo ya fue agregado a la factura');
      this.SelectArticleCmp.initComponents();
      return;
    } else {
      this.articles.push({...article, totalDiscount0: 0, totalDiscount: 12});
      this.SelectArticleCmp.initComponents();
      document.getElementById('code').focus();
      this.calc();
    }
  }

  onRemoveArticle(article){
    const index = this.articles.findIndex(i => i.id == article.id);
    this.articles.splice(index, 1);
    this.calc();
  }

  //helpers
  getAddedArticle(articleId) {
    const index = this.articles.find(i => i.id == articleId);
    if (index) {
      return index;
    }
    return null;
  }

  calc() {
    this.subtotal0 = 0;
    this.subtotal12 = 0;
    this.descuento = 0;
    this.iva12 = 0;
    this.total = 0;
    this.articles.forEach(p => {
      if (p.iva == 1) {
        this.subtotal12 += p.total;
      } else {
        this.subtotal0 += p.total;
      }
      this.descuento += this.validate.calcPercent(p.total, p.discount);
      this.total += p.totalIva;
    });
    this.iva12 = this.validate.calcPercent(this.subtotal12, this.cfg.iva);
  }

  reCalcItem(article) {
    let totalIva = 0;
    let desc = this.validate.calcPercent(article.pvp, article.discount);
    let total = (article.pvp * article.qty);
    if (article.iva === 1) {
      totalIva = this.validate.calcPercent((total - desc), this.cfg.iva);
    }
    total = total - desc;
    article.totalIva = totalIva+total;
    article.total = total;
    if (article.qty > article.stock) {
      this.toast.warn(`La cantidad ingresada (${article.qty}) en mayor al stock (${article.stock})`);
      article.qty = article.stock;
    }
    this.calc();
  }

  //resets
  initComponents() {
    this.articles = [];
    this.formData = {
      date: moment().format('YYYY-MM-DD'),
      methodPay: 1,
      client_id : 1,
    };
    this.subtotal0 = 0;
    this.subtotal12 = 0;
    this.descuento = 0;
    this.iva12 = 0;
    this.total = 0;
    this.getSeq();
  }

  //validate invoice
  validFrm(): boolean {
    const data = this.formData;
    if (!data.date) {
      this.toast.err('Ingrese una fecha válida');
      return false;
    }
    if (!data.client_id || data.client_id <= 0) {
      this.toast.err('Seleccione un cliente')
      return false;
    }
    if (this.articles.length <= 0) {
      this.toast.err('Cargue al menos un articulo a la factura');
      return false;
    }
    return true;
  }
}
