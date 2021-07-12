import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MomentModule } from 'ngx-moment';

import 'moment/locale/es';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CoreModule} from './core/core.module';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';
import {LoadingBarModule} from '@ngx-loading-bar/core';
import {AuthModule} from './modules/auth/auth.module';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {userReducer} from './modules/auth/store/user.reducer';
import {environment} from '../environments/environment';
import {MainRoute} from './app.routing';
import {PersonModule} from './modules/persons/person.module';
import {ToastNotificationsModule} from 'ngx-toast-notifications';
import {UserModule} from './modules/users/index/users.module';
import {OptometryModule} from './modules/medical/optometry/optometry.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LoadingBarHttpClientModule,
    LoadingBarModule,
    ToastNotificationsModule,
    MomentModule,
    MainRoute,
    CoreModule,
    AuthModule,
    PersonModule,
    UserModule,
    OptometryModule,
    StoreModule.forRoot({data: userReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
