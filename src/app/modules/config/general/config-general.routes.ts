import {Routes} from '@angular/router';
import {AuthGuard} from '../../auth/services/auth.guard';
import { MainViewConfigComponent } from './components/main-view/main-view-config.component';
import { GeneralConfigComponent } from './views/general-config/general-config.component';
import { ElectSignComponent } from './views/elect-bill/elect-bill.component';

const configRoutes : Routes = [
  {path: 'config', component: MainViewConfigComponent, canActivate: [AuthGuard]},
];

export default configRoutes;
