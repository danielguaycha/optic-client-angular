import {NgModule} from '@angular/core';
import {DocsComponent} from './views/docs/docs.component';
import {CoreModule} from '../../../core/core.module';
import {CfdiRouting} from './cfdi.routing';


@NgModule({
  imports: [
    CoreModule, CfdiRouting
  ],
  exports: [],
  declarations: [
    DocsComponent
  ],
  providers: [],
})
export class CfdiModule {
}
