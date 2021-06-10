import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {InventoryRouting} from './inventory.routing';
import {InventoryAdjustComponent} from './views/inventory-adjust/inventory-adjust.component';
import {ArticleModule} from '../articles/article.module';

@NgModule({
  imports: [CoreModule, InventoryRouting, ArticleModule],
  exports: [],
  declarations: [
    InventoryAdjustComponent
  ],
  providers: [],
})
export class InventoryModule {
}


