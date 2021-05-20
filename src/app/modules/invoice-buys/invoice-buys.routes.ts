import {Routes} from '@angular/router';
import { AuthGuard } from '../auth/services/auth.guard';
import { InvoiceBuysComponent } from './views/invoice-buys.component';

const invoiceBuysRoutes : Routes = [
  {path: 'invoice-buys', component: InvoiceBuysComponent, canActivate: [AuthGuard]},
];

export default invoiceBuysRoutes;
