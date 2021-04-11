import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import {MainRoute} from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    MainRoute
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
