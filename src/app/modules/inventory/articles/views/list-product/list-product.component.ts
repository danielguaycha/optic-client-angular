import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../services/articles.service';
import {ConfirmService} from '../../../../../core/services/confirm.service';
import {ToastService} from '../../../../../core/services/toast.service';
import { Articles } from '../../models/articles.model';
import {ValidateService} from '../../../../../core/services/validate.service';

@Component({
    selector: 'app-list-products',
    templateUrl: './list-product.component.html',
  })
  export class ListProductsComponent implements OnInit {

    public loader:boolean;
    public products:Array<Articles> = [];
    constructor(
        private articleService: ArticleService,
        public validate: ValidateService,
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
        this.loader = false;
      }, error => {
        this.loader = false;
      })
    }

    onCreateProduct(event) {
      this.products.push(event);
    }

    deleteProduct(product:Articles) {
      this.confirm.confirm(`¿Está seguro que desea eliminar ${product.name.toUpperCase()}?`, () => {
        this.toast.err("Borrado con exito!! Pero falta agregar este metodo en el api");
        // this.articleService.deleteProduct(product.id).subscribe(res => {
        //   console.log(res);
        //   if (res.ok) {
        //     this.toast.ok(res.message);
        //   }
        // }, err => {
        //   this.toast.err(err);
        // })
      });
    }
  }
