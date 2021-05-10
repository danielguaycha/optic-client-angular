import {Routes} from '@angular/router';
import {ListPersonComponent} from './views/list-person/list-person.component';
import {AuthGuard} from '../auth/services/auth.guard';
import {AddPersonComponent} from './views/add-person/add-person.component';
import {EditPersonComponent} from './views/edit-person/edit-person.component';
import { ListProviderComponent } from './views/list-provider/list-provider.component';
import { AddProviderComponent } from './views/add-provider/add-provider.component';
import { EditProviderComponent } from './views/edit-provider/edit-provider.component';

const personRoutes: Routes = [
  {path: 'persons/:id/edit', component: EditPersonComponent, canActivate: [AuthGuard]},
  {path: 'persons/add', component: AddPersonComponent, canActivate: [AuthGuard]},
  {path: 'persons', component: ListPersonComponent, canActivate: [AuthGuard]},
  {path: 'providers', component: ListProviderComponent, canActivate: [AuthGuard]},
  {path: 'providers/add', component: AddProviderComponent, canActivate: [AuthGuard]},
  {path: 'providers/:id/edit', component: EditProviderComponent, canActivate: [AuthGuard]},
];

export default personRoutes;
