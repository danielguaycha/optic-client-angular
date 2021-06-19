import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {BuysRouting} from './buys.routing';
import { InvoiceBuysComponent } from './views/buys.component';
import {PersonModule} from '../../persons/person.module';

@NgModule({
  imports: [CoreModule, BuysRouting, PersonModule],
  exports: [],
  declarations: [InvoiceBuysComponent],
  providers: [],
})
export class BuysModule {}
