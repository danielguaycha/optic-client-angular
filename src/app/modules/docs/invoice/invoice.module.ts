import { NgModule } from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {MethodPaymentComponent} from './components/method-payment/method-payment.component';
import {CreateInvoiceComponent} from './views/create-invoice/create-invoice.component';
import {InvoiceRouting} from './invoice.routing';
import {PersonModule} from '../../persons/person.module';
import {ArticleModule} from '../../inventory/articles/article.module';

@NgModule({
  declarations: [
    MethodPaymentComponent,
    CreateInvoiceComponent
  ],
  imports: [
    CoreModule, InvoiceRouting, PersonModule, ArticleModule,
  ]
})
export class InvoiceModule { }
