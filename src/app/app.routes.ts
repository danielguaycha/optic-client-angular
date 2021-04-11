import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './modules/auth/components/login/login.component';
import {NgModule} from '@angular/core';
import authRoutes from './modules/auth/auth.routes';

const MainRoutes: Routes = [
  { path: '', component: LoginComponent },
  ...authRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(MainRoutes)],
  exports: [RouterModule]
})

export class MainRoute {}
