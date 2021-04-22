import {Routes} from '@angular/router';
import {AuthGuard} from '../auth/services/auth.guard';
import { EnterpriseComponent } from './views/add-user/enterprise.component';

const enterpriseRoutes: Routes = [
  {path: 'enterprise', component: EnterpriseComponent, canActivate: [AuthGuard]},
];

export default enterpriseRoutes;