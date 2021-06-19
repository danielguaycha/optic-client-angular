import { NgModule } from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {MethodPaymentComponent} from './components/method-payment/method-payment.component';
import {CreateInvoiceComponent} from './views/create-invoice/create-invoice.component';
import {InvoiceRouting} from './invoice.routing';
import {PersonModule} from '../../persons/person.module';
import {ArticleModule} from '../../inventory/articles/article.module';
import { SelectInvoiceComponent } from './components/select-invoice/select-invoice.component';
import { DialogSearchInvoiceComponent } from './components/dialog-search-invoice/dialog-search-invoice.component';

@NgModule({
    declarations: [
        MethodPaymentComponent,
        CreateInvoiceComponent,
        SelectInvoiceComponent,
        DialogSearchInvoiceComponent
    ],
    exports: [
        SelectInvoiceComponent
    ],
    imports: [
        CoreModule, InvoiceRouting, PersonModule, ArticleModule,
    ]
})
export class InvoiceModule { }
