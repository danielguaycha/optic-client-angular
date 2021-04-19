import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/articles.service';
import {ConfirmService} from '../../../../../core/services/confirm.service';
import {ToastService} from '../../../../../core/services/toast.service';
import { Articles } from '../../models/articles.model';

@Component({
    selector: 'app-list-products',
    templateUrl: './list-product.component.html',
  })
  export class ListProductsComponent implements OnInit {
  
    public loader:boolean;
    public products:Array<Articles> = [];
    constructor(
        private articleService: ArticleService,
        private confirm: ConfirmService,
        private toast: ToastService) {  
    }
  
    ngOnInit(): void {
      this.getProducts();
    }
  
    getProducts() {
      this.loader = true;
      this.articleService.getProducts().subscribe(res => {
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
  