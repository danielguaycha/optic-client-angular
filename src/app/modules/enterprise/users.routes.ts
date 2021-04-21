import {Routes} from '@angular/router';
import {AuthGuard} from '../auth/services/auth.guard';
import { CreateUserComponent } from './views/add-user/add-user.component';

const userRoutes: Routes = [
  {path: 'users', component: CreateUserComponent, canActivate: [AuthGuard]},
];

export default userRoutes;