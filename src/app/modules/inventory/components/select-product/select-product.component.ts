import { Component, OnInit } from '@angular/core';
import {InventoryService} from '../../services/inventory.service';
import {Product} from '../../models/products.model';
import {ConfigService} from '../../../config/general/services/config.service';

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html',
})
export class SelectProductComponent implements OnInit {
  code: string
  selectProduct: Product;
  selectProductCalc: any;
  constructor(private productServ: InventoryService, private cfg: ConfigService) {
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

  ngOnInit(): void {
  }

  searchProduct(key) {
    if (key.keyCode !== 13) return;
    if (this.code.trim().length <= 0) return;
    this.productServ.getProduct(this.code, true).subscribe(res => {
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
    const p = this.selectProduct;
    const pvp = p.pvp;
    const iva = this.cfg.iva;

    if (p.iva === 1) {
      // tiene iva
      this.selectProductCalc.total = this.cfg.toFloat(this.cfg.getNeto(p.pvp, iva) * this.selectProductCalc.qty);
      this.selectProductCalc.totalIva = this.cfg.toFloat(p.pvp * this.selectProductCalc.qty);
    } else {
      this.selectProductCalc.total = this.cfg.toFloat(p.pvp * this.selectProductCalc.qty);
      this.selectProductCalc.totalIva = this.cfg.toFloat(p.pvp * this.selectProductCalc.qty);
      // no tiene iva
    }
    //console.log('calculando', c.total, c.totalIva);
  }
}
