import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { ToastService } from 'src/app/core/services/toast.service';
import { Articles } from '../../models/articles.model';
import { ArticleService } from '../../services/articles.service';
import {ConfigService} from '../../../../config/general/services/config.service';
import {ValidateService} from '../../../../../core/services/validate.service';
import { Category } from '../../../category/models/categories.model';
import { CategoryService } from '../../../category/services/category.service';

@Component({
  selector: 'app-frm-product',
  templateUrl: './frm-product.component.html',
})
export class FrmProductComponent implements OnInit {

  pvp:number = 0;
  iva:number = 0;
  price: number = 0;
  utility:number = 0;
  pvpIva:number = 0
  ivaList: Array<number> = [0]


  @Output() create: EventEmitter<any> = new EventEmitter();
  @Input() formData!:Articles;
  @Input() category!:Category;
  @Input() edit:boolean = false;

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
    this.loader = false;
    if(this.edit){
      this.iva = this.formData.iva > 0 ? this.cfg.iva : 0;
      //price initial
      this.price = this.validate.parseDouble(this.formData.price_purchase);
      //price + iva
      this.pvp = this.formData.iva > 0 ? this.validate.addPercent(this.price, this.cfg.iva) : this.price;
      this.pvpIva = this.formData.iva > 0 ? this.validate.addPercent(this.formData.pvp, this.cfg.iva) : this.formData.pvp;
      this.utility = this.validate.round(this.validate.getPercent(this.pvpIva, this.pvp), true);
      // category
      this.category.id = this.formData.category_id;
      this.category.name = this.formData.category_name;
    }
  }
  // storing products
  onSubmit() {
    this.loader = true;
    if(this.iva > 0){
      if(this.pvpIva < this.pvp){
        this.toast.err("El precio final no puede ser menor al Costo + Iva");
      this.loader = false;
      return;
    }
  }
  if (!this.edit) this.storeProduct();
  if (this.edit) this.updateProduct();
}

//products
storeProduct(){
  this.formData.pvp = this.iva > 0 ? this.pvpIva : this.validate.getNeto(this.pvpIva, this.cfg.iva);
  this.formData.iva = this.iva > 0 ? 1 : 0;
  this.formData.category_id = this.category.id;
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
  this.formData.pvp = this.iva > 0 ? this.pvpIva : this.validate.getNeto(this.pvpIva, this.cfg.iva);
  this.formData.iva = this.iva > 0 ? 1 : 0;
  this.formData.category_id = this.category.id;
  this.loader = true;
  this.articleService.updateProducts(this.formData.id, this.formData).subscribe(res => {
    console.log("res: ", res);
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
      console.log(error);
    })
    
  }
  
  // calc
  onChangeIVA(value:string){
    this.iva = this.validate.parseDouble(value);
    this.formData.iva = this.iva;
    this.calcIva();
  }
  
  calcIva() {
    this.pvp = this.validate.addPercent(this.price, this.iva);
    this.pvpIva = this.validate.addPercent(this.pvp, this.utility);
  }

  // events  
  onInputPrice(value: string) {
    this.price = this.validate.parseDouble(value);
    this.calcIva();
  }
  onInputUtility(value: string) {
    this.utility = this.validate.parseDouble(value);
    this.pvpIva = this.validate.addPercent(this.pvp, this.utility);
    this.formData.pvp = this.pvpIva;
  }

  onInputFinalPrice(value: string) {
    console.log("PVP: ", value);
    this.utility = this.validate.round(this.validate.getPercent(this.validate.parseDouble(value), this.pvp));
    this.pvpIva = this.validate.parseDouble(value);
    console.log("PVP: ", this.pvpIva);
  }

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
    this.pvpIva = 0;
    this.price = 0;
    this.pvp = 0;
  }
}
