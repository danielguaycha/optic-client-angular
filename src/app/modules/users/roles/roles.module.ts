import {NgModule} from '@angular/core';
import {CoreModule} from '../../../core/core.module';
import {RolesRouting} from './roles.routing';
import {AddRolComponent} from './views/add-rol/add-rol.component';


@NgModule({
  imports: [CoreModule, RolesRouting],
  exports: [],
  declarations: [
    AddRolComponent
  ],
  providers: [],
})
export class RolesModule {
}
