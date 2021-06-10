import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListProductsComponent} from './views/list-product/list-product.component';
import {AddProductComponent} from './views/add-product/add-product.component';
import {EditArticleComponent} from './views/edit-product/edit-product.component';

const routes: Routes = [
  {path: '', component: ListProductsComponent},
  {path: 'add', component: AddProductComponent},
  {path: ':id/edit', component: EditArticleComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class ArticleRouting {
}
