import { NgModule } from '@angular/core';
import {LoginComponent} from './components/login/login.component';
import {AuthRouting} from './auth.routing';
import {CoreModule} from '../../core/core.module';
import { AuthLayoutComponent } from './pages/auth-layout/auth-layout.component';

@NgModule({
  declarations: [LoginComponent, AuthLayoutComponent],
  imports: [
    CoreModule,
    AuthRouting,
  ]
})

export class AuthModule { }
