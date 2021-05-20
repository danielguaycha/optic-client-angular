import {Routes} from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { ElectVouchersComponent } from './views/elect_vouchers.component';

const electVochuersRoutes : Routes = [
  {path: 'vouchers', component: ElectVouchersComponent, canActivate: [AuthGuard]},
];

export default electVochuersRoutes;
