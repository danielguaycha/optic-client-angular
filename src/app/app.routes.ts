import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './modules/auth/components/login/login.component';
import {NgModule} from '@angular/core';
import authRoutes from './modules/auth/auth.routes';
import personRoutes from './modules/persons/person.routes';
import productRoutes from './modules/inventory/inventory.routes';
import invoiceRoutes from './modules/invoice/invoice.route';
import configRoutes from './modules/config/general/config-general.routes';

const MainRoutes: Routes = [
  { path: '', component: LoginComponent },
  ...authRoutes, ...personRoutes,
  ...invoiceRoutes, ...productRoutes,
  ...configRoutes
]

@NgModule({
  imports: [RouterModule.forRoot(MainRoutes)],
  exports: [RouterModule]
})

export class MainRoute {}
