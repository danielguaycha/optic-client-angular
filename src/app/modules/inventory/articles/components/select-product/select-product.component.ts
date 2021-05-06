import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Articles} from '../../models/articles.model';
import {ConfigService} from '../../../../config/general/services/config.service';
import { ArticleService } from '../../services/articles.service';
import {ValidateService} from '../../../../../core/services/validate.service';
import {ToastService} from '../../../../../core/services/toast.service';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
})
export class SelectProductComponent implements OnInit {
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

  emitArticle(key) {
    if (key.keyCode == 13) {
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
        //TODO: Abrir modal para buscar el producto
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
    const iva = this.cfg.iva;
    const qty = this.selectProductCalc.qty;
    let pvp = p.pvp; // precio neto, sin impuestos

    let total = 0;
    let totalIva = 0;
    let desc = 0;

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
