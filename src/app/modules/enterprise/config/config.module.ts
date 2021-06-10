import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {ConfigRouting} from './config.routing';
import {ConfigGeneralComponent} from './views/general-config/config.component';
import {FrmSeqComponent} from './components/frm-seq/frm-seq.component';

@NgModule({
  imports: [CoreModule, ConfigRouting],
  exports: [],
  declarations: [
    ConfigGeneralComponent,
    FrmSeqComponent
  ],
  providers: [],
})
export class ConfigModule {
}
