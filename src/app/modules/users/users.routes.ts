import {Routes} from '@angular/router';
import {AuthGuard} from '../auth/services/auth.guard';
import { CreateUserComponent } from './views/add-user/add-user.component';
import { ListUserComponent } from './views/list-user/list-user.component';
import { EditUserComponent } from './views/edit-user/edit-user.component';

const userRoutes: Routes = [
  {path: 'users/add', component: CreateUserComponent, canActivate: [AuthGuard]},
  {path: 'users', component: ListUserComponent, canActivate: [AuthGuard]},
  {path: 'users/:id/edit', component: EditUserComponent, canActivate: [AuthGuard]},

];

export default userRoutes;