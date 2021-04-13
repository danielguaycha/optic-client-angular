import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import {MainRoute} from './app.routes';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './modules/auth/services/jwt.interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './modules/auth/services/auth.service';
import {ErrorInterceptor} from './core/err.interceptor';
import { AlertComponent } from './core/components/alert/alert.component';
import {AlertService} from './core/alert.service';
import { ButtonComponent } from './core/components/button/button.component';
import { ListPersonComponent } from './modules/persons/views/list-person/list-person.component';
import {AuthGuard} from './modules/auth/services/auth.guard';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { ModalComponent } from './core/components/modal/modal.component';
import { DialogAddClientComponent } from './modules/persons/components/dialog-add-client/dialog-add-client.component';
import { FrmClientComponent } from './modules/persons/components/frm-client/frm-client.component';
import {ToastNotificationsModule} from 'ngx-toast-notifications';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    ButtonComponent,
    ListPersonComponent,
    NavbarComponent,
    ModalComponent,
    DialogAddClientComponent,
    FrmClientComponent,
  ],
  imports: [
    BrowserModule,
    MainRoute,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastNotificationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthService, AlertService, AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
