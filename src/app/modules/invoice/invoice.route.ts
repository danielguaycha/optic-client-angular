import {Routes} from '@angular/router';
import {CreateInvoiceComponent} from './views/create-invoice/create-invoice.component';

const invoiceRoutes: Routes = [
  {path: 'invoice', component: CreateInvoiceComponent }
];

export default invoiceRoutes;
