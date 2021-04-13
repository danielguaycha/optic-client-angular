import {Routes} from '@angular/router';
import {ListPersonComponent} from './views/list-person/list-person.component';
import {AuthGuard} from '../auth/services/auth.guard';

const personRoutes: Routes = [
  {path: 'persons', component: ListPersonComponent, canActivate: [AuthGuard]}
];

export default personRoutes;
