import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditPersonComponent} from './views/edit-person/edit-person.component';
import {AddPersonComponent} from './views/add-person/add-person.component';
import {ListPersonComponent} from './views/list-person/list-person.component';
import {ListProviderComponent} from './views/list-provider/list-provider.component';
import {AddProviderComponent} from './views/add-provider/add-provider.component';
import {EditProviderComponent} from './views/edit-provider/edit-provider.component';

const PERSON_ROUTES = {
  index: 'persons',
  add: 'add',
  edit: ':id/edit',
  providers: {
    index: 'providers',
    add: 'provider/add',
    edit: 'provider/:id/edit'
  }
};

const routes: Routes  = [
  {path: '', component: ListPersonComponent, pathMatch: 'full'},
  {path: PERSON_ROUTES.edit, component: EditPersonComponent},
  {path: PERSON_ROUTES.add, component: AddPersonComponent},
  // providers
  {path: PERSON_ROUTES.providers.add, component: AddProviderComponent},
  {path: PERSON_ROUTES.providers.edit, component: EditProviderComponent},
  {path: PERSON_ROUTES.providers.index, component: ListProviderComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonRouting {}


