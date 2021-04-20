import {Routes} from '@angular/router';
import {AuthGuard} from '../auth/services/auth.guard';
import { AddRolComponent } from './views/add-rol/add-rol.component';

const rolesRoutes: Routes = [
  {path: 'roles/add', component: AddRolComponent, canActivate: [AuthGuard]},
];

export default rolesRoutes;