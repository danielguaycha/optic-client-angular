import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './modules/auth/components/login/login.component';
import {NgModule} from '@angular/core';
import authRoutes from './modules/auth/auth.routes';
import personRoutes from './modules/persons/person.routes';
import invoiceRoutes from './modules/invoice/invoice.route';
import configRoutes from './modules/config/general/config-general.routes';
import categoryRoutes from './modules/inventory/category/category.routes';
import articlesRoutes from './modules/inventory/articles/articles.routes';
import inventoryAdjustRoutes from './modules/inventory/adjust/inventory.adjust.routes';

const MainRoutes: Routes = [
  { path: '', component: LoginComponent },
  ...authRoutes,
  ...personRoutes,
  ...invoiceRoutes,
  //inventory
  ...categoryRoutes,
  ...articlesRoutes,
  ...inventoryAdjustRoutes,
  //config
  ...configRoutes
]

@NgModule({
  imports: [RouterModule.forRoot(MainRoutes)],
  exports: [RouterModule]
})

export class MainRoute {}
