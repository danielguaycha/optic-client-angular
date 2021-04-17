import {Routes} from '@angular/router';
import {GeneralConfigComponent} from './views/general-config/general-config.component';
import {AuthGuard} from '../../auth/services/auth.guard';

const configRoutes : Routes = [
  {path: 'config', component: GeneralConfigComponent, canActivate: [AuthGuard]}
];

export default configRoutes;
