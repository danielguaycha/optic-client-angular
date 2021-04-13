import { Component } from '@angular/core';
import {AuthService} from './modules/auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'optic-client-angular';
  public auth:boolean = false;
  constructor(public authService: AuthService) {
    this.auth = !!authService.getToken();
  }

  ngDoCheck() {
    this.auth = !!this.authService.getToken();
  }
}
