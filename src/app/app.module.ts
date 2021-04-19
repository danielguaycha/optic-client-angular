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
import { ListProductsComponent } from './modules/inventory/articles/views/list-product/list-product.component';
import { DialogAddProductComponent } from './modules/inventory/articles/components/dialog-add-product/dialog-add-product.component';
import { EditArticleComponent } from './modules/inventory/articles/views/edit-product/edit-product.component';
import { FrmProductComponent } from './modules/inventory/articles/components/frm-product/frm-product.component';
import { DialogAddCategoryComponent } from './modules/inventory/category/components/dialog-add-category/dialog-add-category.component';
import { FrmCategoryComponent } from './modules/inventory/category/components/frm-category/frm-category.component';
import { AddProductComponent } from './modules/inventory/articles/views/add-product/add-product.component';
import { SelectProductComponent } from './modules/inventory/articles/components/select-product/select-product.component';
import { GeneralConfigComponent } from './modules/config/general/views/general-config/general-config.component';
import {StoreModule} from '@ngrx/store';
import { userReducer } from './modules/auth/store/user.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';

import { ListCategoriesComponent } from './modules/inventory/category/views/list-category/list-categories.component';
import { DialogSearchCategoryComponent } from './modules/inventory/category/components/dialog-search-category/dialog-search-category.component';

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
    SelectPersonComponent,

    ListProductsComponent,
    DialogAddProductComponent,
    FrmProductComponent,
    DialogAddCategoryComponent,
    FrmCategoryComponent,
    AddProductComponent,
    SelectProductComponent,
    GeneralConfigComponent,
    ListCategoriesComponent,
    DialogSearchCategoryComponent,
    EditArticleComponent

  ],
  imports: [
    BrowserModule,
    MainRoute,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastNotificationsModule,
    MomentModule,
    StoreModule.forRoot({data: userReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthService, AlertService, AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
