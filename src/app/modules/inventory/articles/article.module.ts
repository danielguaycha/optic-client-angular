import {NgModule} from '@angular/core';
import {DialogAddProductComponent} from './components/dialog-add-product/dialog-add-product.component';
import {EditArticleComponent} from './views/edit-product/edit-product.component';
import {ListProductsComponent} from './views/list-product/list-product.component';
import {FrmProductComponent} from './components/frm-product/frm-product.component';
import {AddProductComponent} from './views/add-product/add-product.component';
import {SelectProductComponent} from './components/select-product/select-product.component';
import {DialogSearchProductComponent} from './components/dialog-search-product/dialog-search-product.component';
import {CoreModule} from '../../../core/core.module';
import {ArticleRouting} from './article.routing';
import {CategoryModule} from '../category/category.module';


@NgModule({
  imports: [CoreModule, ArticleRouting, CategoryModule],
  exports: [
    SelectProductComponent,
    DialogSearchProductComponent,
    DialogAddProductComponent
  ],
  declarations: [
    DialogAddProductComponent,
    DialogSearchProductComponent,
    EditArticleComponent,
    ListProductsComponent,
    FrmProductComponent,
    AddProductComponent,
    SelectProductComponent
  ],
  providers: [],
})

export class ArticleModule {}
