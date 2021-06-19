import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { ToastService } from 'src/app/core/services/toast.service';
import { Articles } from '../../models/articles.model';
import { ArticleService } from '../../services/articles.service';
import { ConfigService } from '../../../../enterprise/config/services/config.service';
import { ValidateService } from '../../../../../core/services/validate.service';
import { Category } from '../../../category/models/categories.model';
import { CategoryService } from '../../../category/services/category.service';
import {FrmPricesComponent} from './frm-prices/frm-prices.component';

@Component({
  selector: 'app-frm-product',
  templateUrl: './frm-product.component.html',
})
export class FrmProductComponent implements OnInit {
  @ViewChild(FrmPricesComponent) FrmPrices: FrmPricesComponent;
  @Output() create: EventEmitter<any> = new EventEmitter();
  @Input() formData!:Articles;

  @Input() category!:Category;
  @Input() edit:boolean = false;

  ivaList: Array<number> = [0]
  ivaSelect: any = 0;
  public loader: boolean = false;

  constructor(
    private articleService : ArticleService,
    private categoryService : CategoryService,
    private toast: ToastService,
    private cfg : ConfigService,
    public validate: ValidateService,) {
    this.ivaList.push(cfg.iva);
    if (!this.edit) {
      this.initFormData();
    }

  }

  ngOnInit(): void {
    if (this.edit) {
      this.ivaSelect = this.formData.iva == 1 ? this.cfg.iva : 0;
      this.category.name = this.formData.category_name;
    }
  }

  // storing products
  onSubmit() {
    if(this.formData.iva > 0 && this.formData.pvp < this.formData.price_purchase){
      this.toast.err("El precio de venta no puede ser menor al precio de costo");
      return;
    }
    this.FrmPrices.emit();
    if (!this.edit) this.storeProduct();
    if (this.edit) this.updateProduct();
}

  //products
  storeProduct(){
    this.formData.category_id = this.category.id;
    this.formData.iva = this.ivaSelect > 0 ? 1 : 0;
    this.loader = true;
    this.articleService.saveProduct(this.formData).subscribe(res => {
      if (res.ok) {
        this.initFormData();
        this.create.emit(res.body);
        this.toast.ok(res.message);
      }
      this.loader = false;
    }, error => {
      this.loader = false;
      this.toast.err(error);
    });
  }

  updateProduct() {
    this.formData.iva = this.ivaSelect > 0 ? 1 : 0;
    this.loader = true;
    this.articleService.updateProducts(this.formData.id, this.formData).subscribe(res => {
      if (res.ok) {
        this.toast.ok(res.message)
      }
        this.loader = false;
      }, error => {
        this.loader = false;
        this.toast.err(error);
      });
    }

  //events for category
  onSelectCategory(category) {
    this.category = category;
  }

  onSearchCategory(key) {
    if (key.keyCode !== 13) return;
    if (!this.category.id) return;
    key.preventDefault();
    this.categoryService.getCategory(this.category.id).subscribe(res => {
      if (res.ok && res.body) {
        this.category = res.body;
        document.getElementById('product_name').focus();
      }
    }, error => {
      // console.log(error);
    })

  }
  // prices
  onChangePrices(prices) {
    this.formData.pvp = prices.pvp1;
    this.formData.price_purchase = prices.price;
  }

  // reset form
  initFormData() {
    this.formData = {
      code: '',
      name: '',
      description: '',
      pvp: 0,
      price_purchase: '',
      type: 'PRODUCTO',
      iva: 0,
      category_id: '',
    };
    this.category = {
      id: "",
      name: '',
      description: '',
    };
    if (this.FrmPrices)
      this.FrmPrices.initComponents();
  }
}
