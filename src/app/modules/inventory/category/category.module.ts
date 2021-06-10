import {NgModule} from '@angular/core';
import {FrmCategoryComponent} from './components/frm-category/frm-category.component';
import {DialogAddCategoryComponent} from './components/dialog-add-category/dialog-add-category.component';
import {DialogSearchCategoryComponent} from './components/dialog-search-category/dialog-search-category.component';
import {ListCategoriesComponent} from './views/list-category/list-categories.component';
import {CoreModule} from '../../../core/core.module';
import {CategoryRouting} from './category.routing';


@NgModule({
  imports: [CoreModule, CategoryRouting],
  exports: [
    DialogAddCategoryComponent,
    DialogSearchCategoryComponent
  ],
  declarations: [
    FrmCategoryComponent,
    DialogAddCategoryComponent,
    DialogSearchCategoryComponent,
    ListCategoriesComponent
  ],
  providers: [],
})
export class CategoryModule {
}
