import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ToastService } from 'src/app/core/services/toast.service';
import { Product } from '../../models/products.model';
import { InventoryService } from '../../services/inventory.service';

@Component({
  selector: 'app-frm-product',
  templateUrl: './frm-product.component.html',
})
export class FrmProductComponent implements OnInit {

  priceValuePlusIva:string = "";

  @Output() create: EventEmitter<any> = new EventEmitter();
  @Input() formData!:Product;
  @Input() edit:boolean = false;
  public loader: boolean = false;
  
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
  }

  ngOnInit(): void {
  }

  onSubmit() {     
    this.loader = true;
    if (!this.edit) this.storeProduct(); 
  }

  storeProduct(){
    this.inventoryService.saveProduct(this.formData).subscribe(res => {
      console.log(res);
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

  onInput(value: number) {
    this.priceValuePlusIva = (value * 1.12).toFixed(2);
  }
}