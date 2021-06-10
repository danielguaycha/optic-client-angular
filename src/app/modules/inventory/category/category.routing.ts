import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListCategoriesComponent} from './views/list-category/list-categories.component';

const routes: Routes = [
  {path: 'categories', component: ListCategoriesComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class CategoryRouting {}
