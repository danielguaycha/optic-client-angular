import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { InvoiceBuysComponent } from './views/buys.component';

const routes: Routes = [
  {path: '', component: InvoiceBuysComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [],
  declarations: [],
})
export class BuysRouting {
}
