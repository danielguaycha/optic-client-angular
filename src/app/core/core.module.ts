import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {ButtonComponent} from './components/button/button.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {AlertComponent} from './components/alert/alert.component';
import {LoaderComponent} from './components/loader/loader.component';
import {ModalComponent} from './components/modal/modal.component';
import {ModalConfirmComponent} from './components/modal-confirm/modal-confirm.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {WithLoaderComponent} from './components/with-loader/with-loader.component';
import {AlertService} from './services/alert.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from '../modules/auth/services/jwt.interceptor';
import {ErrorInterceptor} from './utils/err.interceptor';
import {ToastService} from './services/toast.service';
import { BuildingComponent } from './components/building/building.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RoundPipe } from './pipes/round.pipe';

@NgModule({
  declarations: [
    AlertComponent,
    ButtonComponent,
    LoaderComponent,
    ModalComponent,
    ModalConfirmComponent,
    NavbarComponent,
    SidebarComponent,
    WithLoaderComponent,
    BuildingComponent,
    NotFoundComponent,
    RoundPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AlertService, ToastService
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AlertComponent,
    ButtonComponent,
    LoaderComponent,
    ModalComponent,
    ModalConfirmComponent,
    NavbarComponent,
    SidebarComponent,
    WithLoaderComponent,
    BuildingComponent,
    NotFoundComponent,
    RoundPipe
  ]
})
export class CoreModule { }
