import {Component, OnInit, ViewChild} from '@angular/core';
import {ToastService} from '../../../../../core/services/toast.service';
import {SelectProductComponent} from '../../../articles/components/select-product/select-product.component';
import {ValidateService} from '../../../../../core/services/validate.service';
import {ConfigService} from '../../../../config/general/services/config.service';
import {InventoryService} from '../../services/inventory.service';

@Component({
  selector: 'app-inventory-adjust',
  templateUrl: './inventory-adjust.component.html',
})
export class InventoryAdjustComponent implements OnInit {

  @ViewChild(SelectProductComponent) SelectArticleCmp;
  // form
  articles: Array<any> = [];
  type: number = 1;
  desc: string = '';
  // calculate
  total: number = 0;
  subTotal0: number = 0;
  subTotalIva: number = 0;
  ivaPercent: number = 0;
  // other
  loader:boolean = false;

  constructor(private toast: ToastService,
              public cfg: ConfigService,
              public validate: ValidateService,
              private inventoryServ: InventoryService) {}

  ngOnInit(): void {}

  //submit
  onSubmit() {
    this.loader = true;
    // format data
    let data = {
      type: this.type,
      description: this.desc,
      articles: []
    }
    for (let p of this.articles) {
      data.articles.push({
        price: p.price_purchase,
        quantity: p.qty,
        article_id: p.id
      });
    }
    //sending data
    this.inventoryServ.adjust(data).subscribe(res => {
      if (res.ok) {
        this.toast.ok(res.message);
        this.initComponents();
      }
      this.loader = false;
    }, error => {
      this.loader = false;
      this.toast.err(error);
    })
  }

  //events
  onAddArticle(article) {
    const index = this.articles.find(i => i.id == article.id);
    if (index) {
      this.toast.info('Este articulo ya ha sido agregado');
      return;
    }
    this.articles.push({...article, totalUnid: this.totalUnid(article)});
    this.SelectArticleCmp.initComponents();
    this.calc();
    document.getElementById('code').focus();
  }

  onRemoveArticle(article) {
    const index = this.articles.indexOf(i => i.id === article.id);
    this.articles.splice(index, 1);
    this.calc();
  }

  onChangeType() {
    this.articles.forEach(a => {
      a.totalUnid = this.totalUnid(a)
    })
  }

  onChangeQty(a) {
    if(a.qty < 0){
      this.toast.warn("No puede ingresar cantidades negativas");
      return
    }
    a.totalUnid = this.totalUnid(a);
    this.calc();
  }

  //calculate
  totalUnid (a) {
    if (a.qty <= 0) {
      return 1;
    }
    if (this.type == 1) {
      return a.qty + a.stock
    }
    return a.stock - a.qty;
  }

  calc() {
    this.subTotal0 = 0;
    this.subTotalIva = 0;
    this.total = 0;
    this.ivaPercent = 0;
    this.articles.forEach(art => {
      const price = this.validate.parseDouble(art.price_purchase);
      if (art.iva == 0){
        this.subTotal0 += price * art.qty;
      } else {
        this.subTotalIva += price * art.qty;
      }
    })
    this.ivaPercent = this.validate.calcPercent(this.subTotalIva, this.cfg.iva);
    this.total = this.subTotalIva + this.subTotal0 + this.ivaPercent;
  }

  // reset
  initComponents() {
    this.articles = [];
    this.type = 1;
    this.desc = '';
    this.total=0;
    this.subTotal0 = 0;
    this.subTotalIva = 0;
    this.ivaPercent = 0;
  }
}
