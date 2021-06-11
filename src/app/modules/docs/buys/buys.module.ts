import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {BuysRouting} from './buys.routing';
import { InvoiceBuysComponent } from './buys.component';

@NgModule({
  imports: [CoreModule, BuysRouting],
  exports: [],
  declarations: [InvoiceBuysComponent],
  providers: [],
})
export class BuysModule {}
