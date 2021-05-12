import {Routes} from '@angular/router';
import {AuthGuard} from '../../auth/services/auth.guard';
import { ConfigEnterpriseComponent } from './views/general-config/config.component';

const configRoutes : Routes = [
  {path: 'config', component: ConfigEnterpriseComponent, canActivate: [AuthGuard]},
];

export default configRoutes;
