import {NgModule} from '@angular/core';
import {DocsComponent} from './views/docs/docs.component';
import {CoreModule} from '../../../core/core.module';
import {CfdiRouting} from './cfdi.routing';
import { ItemCfdiComponent } from './components/item-cfdi/item-cfdi.component';


@NgModule({
  imports: [
    CoreModule, CfdiRouting
  ],
  exports: [],
  declarations: [
    DocsComponent,
    ItemCfdiComponent
  ],
  providers: [],
})
export class CfdiModule {
}
