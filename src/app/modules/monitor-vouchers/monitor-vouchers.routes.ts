import {Routes} from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { MonitorVouchersComponent } from './views/monitor-vouchers.component';

const monitorVouchersRoutes : Routes = [
  {path: 'monitor-vouchers', component: MonitorVouchersComponent, canActivate: [AuthGuard]},
];

export default monitorVouchersRoutes;
