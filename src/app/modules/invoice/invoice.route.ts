import {Routes} from '@angular/router';
import {CreateInvoiceComponent} from './views/create-invoice/create-invoice.component';
import {AuthGuard} from '../auth/services/auth.guard';

const invoiceRoutes: Routes = [
  {path: 'invoice', component: CreateInvoiceComponent, canActivate: [AuthGuard] }
];

export default invoiceRoutes;
