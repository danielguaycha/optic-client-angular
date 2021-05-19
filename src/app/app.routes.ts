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
import rolesRoutes from './modules/roles/roles.routes';
import userRoutes from './modules/users/users.routes';
import enterpriseRoutes from './modules/enterprise/enterprise.routes';
import cfdiRoutes from './modules/cfdi/cfdi.routes';

const MainRoutes: Routes = [
  // {path: '/404', name: 'NotFound', component: NotFoundComponent},
  // {path: '/*path', redirectTo: ['NotFound']},

  { path: '', component: LoginComponent },
  ...authRoutes,
  ...personRoutes,
  ...invoiceRoutes,
  //inventory
  ...categoryRoutes,
  ...articlesRoutes,
  ...inventoryAdjustRoutes,
  //config
  ...configRoutes,
  ...rolesRoutes,
  ...userRoutes,
  //Enterprise
  ...enterpriseRoutes,
  //Users

  //Cfdi
  ...cfdiRoutes
]

@NgModule({
  imports: [RouterModule.forRoot(MainRoutes)],
  exports: [RouterModule]
})

export class MainRoute {}
