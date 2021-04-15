import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MomentModule } from 'ngx-moment';

import 'moment/locale/es';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import {MainRoute} from './app.routes';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from './modules/auth/services/jwt.interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './modules/auth/services/auth.service';
import {ErrorInterceptor} from './core/err.interceptor';
import { AlertComponent } from './core/components/alert/alert.component';
import {AlertService} from './core/services/alert.service';
import { ButtonComponent } from './core/components/button/button.component';
import { ListPersonComponent } from './modules/persons/views/list-person/list-person.component';
import {AuthGuard} from './modules/auth/services/auth.guard';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { ModalComponent } from './core/components/modal/modal.component';
import { DialogAddPersonComponent } from './modules/persons/components/dialog-add-person/dialog-add-person.component';
import { FrmPersonComponent } from './modules/persons/components/frm-person/frm-person.component';
import {ToastNotificationsModule} from 'ngx-toast-notifications';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AddPersonComponent } from './modules/persons/views/add-person/add-person.component';
import { EditPersonComponent } from './modules/persons/views/edit-person/edit-person.component';
import { ModalConfirmComponent } from './core/components/modal-confirm/modal-confirm.component';
import { CreateInvoiceComponent } from './modules/invoice/views/create-invoice/create-invoice.component';
import { DialogSearchPersonComponent } from './modules/persons/components/dialog-search-person/dialog-search-person.component';
import { LoaderComponent } from './core/components/loader/loader.component';
import { SelectPersonComponent } from './modules/persons/components/select-person/select-person.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    ButtonComponent,
    ListPersonComponent,
    NavbarComponent,
    ModalComponent,
    DialogAddPersonComponent,
    FrmPersonComponent,
    AddPersonComponent,
    EditPersonComponent,
    ModalConfirmComponent,
    CreateInvoiceComponent,
    DialogSearchPersonComponent,
    LoaderComponent,
    SelectPersonComponent
  ],
  imports: [
    BrowserModule,
    MainRoute,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastNotificationsModule,
    MomentModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthService, AlertService, AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
