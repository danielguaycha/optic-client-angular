import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthLayoutComponent} from './modules/auth/pages/auth-layout/auth-layout.component';
import {AuthGuard} from './modules/auth/services/auth.guard';
import {BuildingComponent} from './core/components/building/building.component';
import {NotFoundComponent} from './core/components/not-found/not-found.component';

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
          },
          {
            path: 'note-credit',
            loadChildren: () => import('./modules/docs/note-credit/note-credit.module').then(m => m.NoteCreditModule)
          }
        ]
      },
      // config
      {
        path: 'enterprise',
        children: [
          {
            path: '',
            loadChildren: () => import('./modules/enterprise/index/enterprise.module').then(m => m.EnterpriseModule)
          },
          {
            path: 'config',
            loadChildren: () => import('./modules/enterprise/config/config.module').then(m => m.ConfigModule)
          }
        ]
      },
      // users
      {
        path: 'users',
        children: [
          {
            path: '',
            pathMatch: 'full',
            loadChildren: () => import('./modules/users/index/users.module').then(m => m.UserModule)
          },
          {
            path: 'roles',
            loadChildren: () => import('./modules/users/roles/roles.module').then(m => m.RolesModule)
          }
        ]
      },
      {
        path: 'medical',
        children: [
          {
            path: 'optometry',
            pathMatch: 'full',
            loadChildren: () => import('./modules/medical/optometry/optometry.module').then(m => m.OptometryModule)
          }
        ]
      },
      {
        path: 'building',
        component: BuildingComponent
      },
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
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
    relativeLinkResolution: 'legacy'
  })],
  providers: [AuthGuard],
  exports: [RouterModule]
})

export class MainRoute {}
