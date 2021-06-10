import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CreateInvoiceComponent} from './views/create-invoice/create-invoice.component';

const routes: Routes  = [
  {path: '', component: CreateInvoiceComponent, pathMatch: 'full'}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRouting { }
