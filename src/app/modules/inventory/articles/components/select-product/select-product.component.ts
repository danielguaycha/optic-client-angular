import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Articles} from '../../models/articles.model';
import {ConfigService} from '../../../../enterprise/config/services/config.service';
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
  @Input() validateStock: boolean = true;

  code: string
  currentArt: Articles;
  calcArt: any;
  constructor(private articleService: ArticleService, public validate: ValidateService,
              private cfg: ConfigService, private toast: ToastService) {
    this.initComponents()
  }

  ngOnInit(): void {}

  emitArticle() {
      if (this.currentArt.id <= 0) {
        this.toast.info('Seleccione un producto primero');
        return;
      }
      if (this.calcArt.qty <= 0) {
        this.toast.warn('La cantidad ingresada debe ser mayor a 0');
        return;
      }
      this.calc();
      this.onSelect.emit({
        ...this.currentArt,
        qty: this.calcArt.qty,
        discount: this.calcArt.discount,
        total: this.calcArt.total,
        totalIva: this.calcArt.totalIva,
      });
  }

  onEnterPress(key: any) {
    if (key.keyCode == 13)
      this.emitArticle();
  }

  onSelectProduct(product: any) {
    this.currentArt = product;
    if (this.hasStock()) {
      this.searchProductCmp.hide();
      const qty = document.getElementById('qty');
      qty.focus();
    }
  }

  searchProduct(key) {
    if (key.keyCode !== 13) return;
    if (this.code.trim().length <= 0) return;
    this.articleService.getProduct(this.code, true).subscribe(res => {
      if (res.ok && res.body) {
        const article = res.body;
        if (this.hasStock(article)) {
          this.currentArt = res.body;
          this.currentArt.pvp = this.validate.round(this.currentArt.pvp);
          const qty = document.getElementById('qty');
          qty.focus();
        }
      } else {
        this.searchProductCmp.show();
      }
    }, error => {});
  }

  calc() {
    if(this.calcArt.qty < 0 || this.calcArt.discount < 0 ){
      this.toast.warn(`No puede ingresar cantidades negativas`,"AVISO");
      return;
    }
    if(this.validateStock && (this.currentArt.type === 'PRODUCTO')
        && (this.calcArt.qty > this.currentArt.stock)
        && this.currentArt.name.length > 0){
      this.toast.warn(`La cantidad ingresada en stock es superior a la existencia en bodega. Cantidad maxima: ${this.currentArt.stock}`,"AVISO");
      return;
    }

    if (!this.showCalc) return; // en caso de solo querer seleccionar el producto

    const p = this.currentArt;
    if (!p.id) return;

    const iva = this.cfg.iva;
    let qty = this.calcArt.qty;
    let pvp = p.pvp; // precio neto, sin impuestos

    let total, desc = 0;
    let totalIva = 0;
    if (qty > this.currentArt.stock && this.currentArt.type === 'PRODUCTO' && this.validateStock) {
      this.toast.warn(`El cantidad ingresada (${qty}) supera el stock (${this.currentArt.stock})`);
      this.calcArt.qty = this.currentArt.stock;
    }

    total = (pvp * qty);
    //desc = this.validate.calcPercent(total, this.selectProductCalc.discount);
    desc = this.calcArt.discount;
    if (desc > total) {
      this.calcArt.discount = 0;
      this.toast.warn(`El descuento no puede ser mayor al total`);
      return;
    }
    if (p.iva === 1) {
      totalIva = this.validate.calcPercent((total - desc), iva);
    }
    total = total - desc;
    this.calcArt.totalIva = totalIva+total;
    this.calcArt.total = total;
  }

  hasStock(product: Articles = null) {
    if (!product) product = this.currentArt;
    if (product.type === 'PRODUCTO' && product.stock <= 0 && this.validateStock) {
      this.toast.warn(`El producto (${product.code}) no tiene stock`);
      return false;
    }
    return true;
  }

  initComponents() {
    this.code = '';
    this.currentArt = {
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
    this.calcArt = {
      discount: 0,
      qty: 1,
      total: 0,
      totalIva: 0
    }
  }

  openSearch() {
    this.searchProductCmp.show();
  }
}
