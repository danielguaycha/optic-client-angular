import {Routes} from '@angular/router';
import {ListPersonComponent} from './views/list-person/list-person.component';
import {AuthGuard} from '../auth/services/auth.guard';
import {AddPersonComponent} from './views/add-person/add-person.component';
import {EditPersonComponent} from './views/edit-person/edit-person.component';

const personRoutes: Routes = [
  {path: 'persons/:id/edit', component: EditPersonComponent, canActivate: [AuthGuard]},
  {path: 'persons/add', component: AddPersonComponent, canActivate: [AuthGuard]},
  {path: 'persons', component: ListPersonComponent, canActivate: [AuthGuard]},
];

export default personRoutes;
