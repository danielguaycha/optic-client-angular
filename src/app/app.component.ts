import { Component } from '@angular/core';
import {AuthService} from './modules/auth/services/auth.service';
import {Store} from '@ngrx/store';
import {addConfig, addUser} from './modules/auth/store/user.actions';
import {SecureStorageService} from './modules/auth/services/secure-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'optic-client-angular';
  public auth:boolean = false;
  constructor(public authService: AuthService,
              private storage: SecureStorageService,
              private store: Store<{user: any, perms:any, config:any}>) {
    this.auth = !!authService.getToken();
  }

  ngOnInit() {
    this.authService.getLoginUser();
  }

  ngDoCheck() {
    this.auth = !!this.authService.getToken();
  }
}
