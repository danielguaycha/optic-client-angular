import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthLayoutComponent} from './modules/auth/pages/auth-layout/auth-layout.component';
import {AuthGuard} from './modules/auth/services/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'persons',
        loadChildren: () =>
          import('./modules/persons/person.module').then(m => m.PersonModule)
      },
      // inventory
      {
        path: 'inventory/category',
        loadChildren: () =>
          import('./modules/inventory/category/category.module').then(m => m.CategoryModule)
      },
      {
        path: 'inventory/articles',
        loadChildren: () =>
          import('./modules/inventory/articles/article.module').then(m => m.ArticleModule)
      },
      {
        path: 'inventory',
        loadChildren: () =>
          import('./modules/inventory/index/inventory.module').then(m => m.InventoryModule)
      },
      // docs
      {
        path: 'doc',
        children: [
          {
            path: 'invoice',
            loadChildren: () => import('./modules/docs/invoice/invoice.module').then(m => m.InvoiceModule)
          },
          {
            path: 'cfdi',
            loadChildren: () => import('./modules/docs/cfdi/cfdi.module').then(m => m.CfdiModule)
          },
          {
            path: 'buys',
            loadChildren: () => import('./modules/docs/buys/buys.module').then(m => m.BuysModule)
          }
        ]
      },
      // config
      {
        path: 'config',
        children: [
          {
            path: 'enterprise',
            loadChildren: () => import('./modules/enterprise/index/enterprise.module').then(m => m.EnterpriseModule)
          },
          {
            path: 'general',
            loadChildren: () => import('./modules/enterprise/config/config.module').then(m => m.ConfigModule)
          }
        ]
      },
      // users
      {
        path: '',
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadChildren: () => import('./modules/users/index/users.module').then(m => m.UserModuleModule)
          },
          {
            path: 'roles',
            loadChildren: () => import('./modules/users/roles/roles.module').then(m => m.RolesModule)
          }
        ]
      }
    ]
  },
  {
    path: 'auth',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    relativeLinkResolution: 'legacy'
  })],
  providers: [AuthGuard],
  exports: [RouterModule]
})

export class MainRoute {}
