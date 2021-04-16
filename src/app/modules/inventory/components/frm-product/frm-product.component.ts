import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ToastService } from 'src/app/core/services/toast.service';
import { Product } from '../../models/products.model';
import { InventoryService } from '../../services/inventory.service';
import { Category } from '../../models/categories.model';

@Component({
  selector: 'app-frm-product',
  templateUrl: './frm-product.component.html',
})
export class FrmProductComponent implements OnInit {

  priceValuePlusIva:string = "";
  iva:string="0";
  pricePurchase:string="0";
  priceFinal:string = "0"
  utility:string = "0"
  priceFinalPlusIva:string = "0"

  @Output() create: EventEmitter<any> = new EventEmitter();
  @Input() formData!:Product;
  @Input() edit:boolean = false;
  public loader: boolean = false;
  public categories:Array<Category> = [];
  public category:Category;

  constructor(private inventoryService : InventoryService, private toast: ToastService) {
    this.formData = {
        code: '',
        name: '',
        description: '',
        pvp: 0,
        price_purchase: '',
        type: '',
        iva: 1,
        category_id: 1,
    };

    this.category = {
      id: "1",
      name: '',
      description: '',      
    }
  }

  ngOnInit(): void {
    this.getCategories();
    this.loader = false;
  }

  onSubmit() {     
    this.loader = true;
    if (!this.edit) this.storeProduct(); 
  }

  onChangeIVA(value:string){
    this.iva=value;
    this.priceValuePlusIva = this.CalculateTax(this.pricePurchase, this.iva);
    this.priceFinalPlusIva = this.CalculateTax(this.priceValuePlusIva, this.utility);
  }

  storeProduct(){
    this.inventoryService.saveProduct(this.formData).subscribe(res => {
      if (res.ok) {
        this.create.emit(res.body);
        this.toast.ok(res.message);
      }
      this.loader = false;
    }, error => {
      this.loader = false;
      this.toast.err(error);
    })
  }

  getCategories() {
    this.loader = true;
    this.inventoryService.getCategories("").subscribe(res => {
      if (res.ok && res.body) {
        this.categories = res.body;
      }
    }, error => {
      this.loader = false;
    })
  }

  onInputPrice(value: string) {
    this.pricePurchase = value;
    this.priceValuePlusIva = this.CalculateTax(value, this.iva);
    this.priceFinalPlusIva = this.CalculateTax(this.priceValuePlusIva, this.utility);

  }

  onInputUtility(value: string) {
    this.utility = value;
    this.priceFinalPlusIva = this.CalculateTax(this.priceValuePlusIva, this.utility);
  }

  onSelect(category) {
    this.category = category;
    this.create.emit(category);
  }

  CalculateTax(value:string, tax:string):string{
    var precio = Number(value);
    var iva = Number(tax);
    precio = precio + (precio * (iva/100));
    return precio.toFixed(2);
  }
}