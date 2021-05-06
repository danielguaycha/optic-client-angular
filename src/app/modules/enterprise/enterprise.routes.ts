import {Routes} from '@angular/router';
import {AuthGuard} from '../auth/services/auth.guard';
import { GetEnterpriseComponent } from './views/get-enterprise/get-enterprise.component';

const enterpriseRoutes: Routes = [
  {path: 'enterprise', component: GetEnterpriseComponent, canActivate: [AuthGuard]},
];

export default enterpriseRoutes;