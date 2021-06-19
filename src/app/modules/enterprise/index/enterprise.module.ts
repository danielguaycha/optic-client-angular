import {NgModule} from '@angular/core';
import {EnterpriseComponent} from './views/edit-enterprise/enterprise.component';
import {GetEnterpriseComponent} from './views/get-enterprise/get-enterprise.component';
import {CoreModule} from '../../../core/core.module';
import {EnterpriseRouting} from './enterprise.routing';
import {NgxImageCompressService} from 'ngx-image-compress';
import { NotifyComponent } from './views/notify/notify.component';

@NgModule({
  imports: [CoreModule, EnterpriseRouting],
  exports: [],
  declarations: [
    EnterpriseComponent, GetEnterpriseComponent, NotifyComponent
  ],
  providers: [NgxImageCompressService],
})
export class EnterpriseModule {
}
