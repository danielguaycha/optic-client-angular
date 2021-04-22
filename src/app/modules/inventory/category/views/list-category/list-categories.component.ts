import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import {ConfirmService} from '../../../../../core/services/confirm.service';
import {ToastService} from '../../../../../core/services/toast.service';
import { Category } from '../../models/categories.model';

@Component({
    selector: 'app-list-categories',
    templateUrl: './list-categories.component.html',
  })
  export class ListCategoriesComponent implements OnInit {

    public loader:boolean;
    public categories:Array<Category> = [];
    constructor(
        private categoryService: CategoryService,
        private confirm: ConfirmService,
        private toast: ToastService) {
    }


    ngOnInit(): void {
      this.getProducts();
    }

    getProducts() {
      this.loader = true;
      this.categoryService.getCategories("").subscribe(res => {
        if (res.ok && res.body) {
          this.categories = res.body;
        }
        this.loader = false;
      }, error => {
        this.loader = false;
      })
    }

    onCreateCategory(event) {
      this.categories.push(event);
    }

    deleteCategory(cat) {
      //TODO: implementar el eliminar las categorías
    }
}
