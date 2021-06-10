import { NgModule } from '@angular/core';
import {CoreModule} from '../../core/core.module';
import {PersonRouting} from './person.routing';
import {ListPersonComponent} from './views/list-person/list-person.component';
import {DialogAddPersonComponent} from './components/dialog-add-person/dialog-add-person.component';
import {FrmPersonComponent} from './components/frm-person/frm-person.component';
import {AddPersonComponent} from './views/add-person/add-person.component';
import {EditPersonComponent} from './views/edit-person/edit-person.component';
import {DialogSearchPersonComponent} from './components/dialog-search-person/dialog-search-person.component';
import {SelectPersonComponent} from './components/select-person/select-person.component';
import {ListProviderComponent} from './views/list-provider/list-provider.component';
import {AddProviderComponent} from './views/add-provider/add-provider.component';
import {EditProviderComponent} from './views/edit-provider/edit-provider.component';

@NgModule({
  declarations: [
    ListPersonComponent,
    DialogAddPersonComponent,
    FrmPersonComponent,
    AddPersonComponent,
    EditPersonComponent,

    ListProviderComponent,
    AddProviderComponent,
    EditProviderComponent,

    DialogSearchPersonComponent,
    SelectPersonComponent,
  ],
  providers: [],
  imports: [
    CoreModule,
    PersonRouting,
  ],
  exports: [
    SelectPersonComponent
  ]
})
export class PersonModule { }
