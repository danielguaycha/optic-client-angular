import { NgModule } from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {AuthRoutingModule} from './auth-routing.module';
import {CoreModule} from '../../core/core.module';
import { AuthLayoutComponent } from './pages/auth-layout/auth-layout.component';

@NgModule({
  declarations: [LoginComponent, AuthLayoutComponent],
  imports: [
    AuthRoutingModule,
    CoreModule,
  ]
})

export class AuthModule { }
