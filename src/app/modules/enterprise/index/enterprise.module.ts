import {NgModule} from '@angular/core';
import {EnterpriseComponent} from './views/edit-enterprise/enterprise.component';
import {GetEnterpriseComponent} from './views/get-enterprise/get-enterprise.component';
import {CoreModule} from '../../../core/core.module';
import {EnterpriseRouting} from './enterprise.routing';
import {NgxImageCompressService} from 'ngx-image-compress';

@NgModule({
  imports: [CoreModule, EnterpriseRouting],
  exports: [],
  declarations: [
    EnterpriseComponent, GetEnterpriseComponent
  ],
  providers: [NgxImageCompressService],
})
export class EnterpriseModule {
}
