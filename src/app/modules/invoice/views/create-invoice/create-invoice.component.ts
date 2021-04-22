import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {ToastService} from '../../../../core/services/toast.service';
import {SelectProductComponent} from '../../../inventory/articles/components/select-product/select-product.component';
import {ValidateService} from '../../../../core/services/validate.service';
import {ConfigService} from '../../../config/general/services/config.service';
import {Modal} from 'bootstrap';
import typePayment from '../../models/type.payment';
import banks from '../../models/banks';
@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
})
export class CreateInvoiceComponent implements OnInit {
  @ViewChild(SelectProductComponent) SelectArticleCmp;

  articles: Array<any>;
  formData: any;
  //calculates
  subtotal0: number;
  subtotal12: number;
  descuento: number;
  iva12: number;
  total: number;
  typePayments: Array<any> = [];

  constructor(private toast: ToastService, public validate: ValidateService,
              public cfg: ConfigService) {
    this.initComponents();
    this.typePayments = typePayment;
  }

  ngOnInit(): void {}

  //confirm payments
  confirmPayment() {
    const modal = new Modal(document.getElementById('modalPayments'), {
      keyboard: true
    });
    modal.show();
  }

  //events
  onAddArticle(article: any) {
    if (article.qty > article.stock) { // verify stock
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
    this.calc();
  }

  //resets
  initComponents() {
    this.articles = [];
    this.formData = {date: moment().format('YYYY-MM-DD')};
    this.subtotal0 = 0;
    this.subtotal12 = 0;
    this.descuento = 0;
    this.iva12 = 0;
    this.total = 0;
  }
}
