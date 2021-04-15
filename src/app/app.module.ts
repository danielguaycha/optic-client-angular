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
import { ListProductsComponent } from './modules/inventory/views/list-product/list-product.component';
import { DialogAddProductComponent } from './modules/inventory/components/dialog-add-product/dialog-add-product.component';
import { FrmProductComponent } from './modules/inventory/components/frm-product/frm-product.component';
import { DialogAddCategoryComponent } from './modules/inventory/components/dialog-add-category/dialog-add-category.component';
import { FrmCategoryComponent } from './modules/inventory/components/frm-category/frm-category.component';
import { AddProductComponent } from './modules/inventory/views/add-product/add-product.component';

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
    ListProductsComponent,
    DialogAddProductComponent,
    FrmProductComponent,
    DialogAddCategoryComponent,
    FrmCategoryComponent,
    AddProductComponent
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
