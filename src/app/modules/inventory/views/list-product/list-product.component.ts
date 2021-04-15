import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../../services/inventory.service';
import {ConfirmService} from '../../../../core/services/confirm.service';
import {ToastService} from '../../../../core/services/toast.service';

@Component({
    selector: 'app-list-products',
    templateUrl: './list-product.component.html',
  })
  export class ListProductsComponent implements OnInit {
  
    public loader:boolean;
    public products:Array<any> = [];
    constructor(
        private inventoryService: InventoryService,
        private confirm: ConfirmService,
        private toast: ToastService) {  
    }
  
    ngOnInit(): void {
      this.getProducts();
    }
  
    getProducts() {
      this.loader = true;
      this.inventoryService.getProducts().subscribe(res => {
        console.log(res);
        if (res.ok && res.body) {
          this.products = res.body;
        }
      }, error => {
        this.loader = false;
      })
    }
  
    onCreateProduct(event) {
      this.products.push(event);
    }
  
    deleteProduct(category) {

    }

  }
  