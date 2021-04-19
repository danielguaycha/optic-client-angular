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
    private validate: ValidateService) {
    this.initFormData();
    this.ivaList.push(cfg.iva);
  }

  ngOnInit(): void {
    this.loader = false;
    document.getElementById('product_cod').focus();
  }
  // storing products
  onSubmit() {
    if (!this.edit) this.storeProduct();
  }

  //products
  storeProduct(){
    this.loader = true;
    this.formData.pvp = this.pvpIva;
    this.formData.iva = this.iva > 0 ? 1 : 0;
    this.formData.category_id = this.category.id;
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
    })
  }

  //events for category
  onSelectCategory(category) {
    this.category = category;
  }
  onSearchCategory(key) {
    if (key.keyCode !== 13) return;
    if (!this.category.id) return;
    key.preventDefault();
    this.categoryService.getCategroy(this.category.id).subscribe(res => {
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
    this.iva= this.validate.parseDouble(value);
    this.calcIva();
  }
  calcIva() {
    this.pvp = this.validate.addPercent(this.price, this.iva);
    this.pvpIva = this.validate.addPercent(this.pvp, this.utility);
  }
  onInputPrice(value: string) {
    this.price = this.validate.parseDouble(value);
    this.calcIva();
  }
  onInputUtility(value: string) {
    this.utility = this.validate.parseDouble(value);
    this.pvpIva = this.validate.addPercent(this.pvp, this.utility);
  }
  onInputFinalPrice(value: string) {
    this.utility = this.validate.getPercent(this.validate.parseDouble(value), this.pvp)
    
  }

  initFormData() {
    this.formData = {
      code: '',
      name: '',
      description: '',
      pvp: 0,
      price_purchase: '',
      type: 'PRODUCTO',
      iva: 1,
      category_id: 1,
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