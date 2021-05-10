import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Articles} from '../../models/articles.model';
import {ConfigService} from '../../../../config/general/services/config.service';
import { ArticleService } from '../../services/articles.service';
import {ValidateService} from '../../../../../core/services/validate.service';
import {ToastService} from '../../../../../core/services/toast.service';
import {DialogSearchProductComponent} from '../dialog-search-product/dialog-search-product.component';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
})
export class SelectProductComponent implements OnInit {
  @ViewChild(DialogSearchProductComponent) searchProductCmp;

  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Input() showCalc: boolean = true;

  code: string
  selectProduct: Articles;
  selectProductCalc: any;
  constructor(private articleService: ArticleService, public validate: ValidateService,
              private cfg: ConfigService, private toast: ToastService) {

    this.initComponents()
  }

  ngOnInit(): void {
  }

  emitArticle() {
      if (this.selectProduct.id <= 0) {
        this.toast.info('Seleccione un producto primero');
        return;
      }
      if (this.selectProductCalc.qty <= 0) {
        this.toast.warn('La cantidad debe ser mayor a 0');
        return;
      }
      this.calc();
      this.onSelect.emit({
        ...this.selectProduct,
        qty: this.selectProductCalc.qty,
        discount: this.selectProductCalc.discount,
        total: this.selectProductCalc.total,
        totalIva: this.selectProductCalc.totalIva,
      });
  }

  onEnterPress(key: any) {
    if (key.keyCode == 13)
      this.emitArticle();
  }

  onSelectProduct(product: any) {
    this.selectProduct = product;
    this.searchProductCmp.hide();
    const qty = document.getElementById('qty');
    qty.focus();
  }

  searchProduct(key) {
    if (key.keyCode !== 13) return;
    if (this.code.trim().length <= 0) return;
    this.articleService.getProduct(this.code, true).subscribe(res => {
      if (res.ok && res.body) {
        this.selectProduct = res.body;
        this.selectProduct.pvp = this.cfg.toFloat(this.selectProduct.pvp);
        const qty = document.getElementById('qty');
        qty.focus();
      } else {
        this.searchProductCmp.show();
      }
    }, error => {});
  }

  calc() {

    if(this.selectProductCalc.qty < 0 ){
      this.toast.warn(`No puede ingresar cantidades negativas`,"AVISO");
      return; 
    }
    if( (this.selectProductCalc.qty > this.selectProduct.stock) && this.selectProduct.name.length > 0){
      this.toast.warn(`La cantidad ingresada en stock es superior a la existencia en bodega. Cantiad maxima: ${this.selectProduct.stock}`,"AVISO");
      return; 
    }

    if (!this.showCalc) return; // en caso de solo querer seleccionar el producto

    const p = this.selectProduct;
    if (!p.id) return;

    const iva = this.cfg.iva;
    let qty = this.selectProductCalc.qty;
    let pvp = p.pvp; // precio neto, sin impuestos

    let total = 0;
    let totalIva = 0;
    let desc = 0;

    if (qty > this.selectProduct.stock) {
      this.toast.warn(`El cantidad ingresada (${qty}) supera el stock (${this.selectProduct.stock})`);
      this.selectProductCalc.qty = this.selectProduct.stock;
    }

    desc = this.validate.calcPercent(pvp, this.selectProductCalc.discount);
    total = (pvp * qty);
    if (p.iva === 1) {
      totalIva = this.validate.calcPercent((total - desc), iva);
    }
    total = total - desc;

    this.selectProductCalc.totalIva = totalIva+total;
    this.selectProductCalc.total = total;
  }

  initComponents() {
    this.code = '';
    this.selectProduct = {
      category_id: 0,
      code: '',
      description: '',
      ice_code: 0,
      id: 0,
      iva: 0,
      name: '',
      office: '',
      office_id: 0,
      price_purchase: 0,
      pvp: 0,
      stock: 0,
      type: ''
    };
    this.selectProductCalc = {
      discount: 0,
      qty: 1,
      total: 0,
      totalIva: 0
    }
  }
}
