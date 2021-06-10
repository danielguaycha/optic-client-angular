import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {InventoryAdjustComponent} from './views/inventory-adjust/inventory-adjust.component';

const routes: Routes = [
  {path: 'adjust', component: InventoryAdjustComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class InventoryRouting {}
