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
    this.getUser();
  }

  ngDoCheck() {
    this.auth = !!this.authService.getToken();
  }

  getUser() {
    this.authService.getUser().subscribe(res => {
      if (res.ok) {
        this.store.dispatch(addUser({ user: res.body.user }));
        this.store.dispatch(addConfig({ cfg: res.body.config }));
        this.storage.set('config', JSON.stringify(res.body.config));
      }
    }, error => {
      // console.log(error);
    })
  }
}
