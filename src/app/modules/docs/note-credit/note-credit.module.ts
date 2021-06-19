import { NgModule } from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {NoteCreditRouting} from './note-credit.routing';
import { CreateNoteCreditComponent } from './views/create-note-credit/create-note-credit.component';
import {InvoiceModule} from '../invoice/invoice.module';

@NgModule({
  declarations: [
    CreateNoteCreditComponent
  ],
  imports: [
    CoreModule, NoteCreditRouting, InvoiceModule
  ]
})
export class NoteCreditModule { }
