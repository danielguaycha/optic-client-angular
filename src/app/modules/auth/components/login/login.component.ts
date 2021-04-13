import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {AlertService} from '../../../../core/alert.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [ AuthService ]
})
export class LoginComponent implements OnInit {

  public user:string;
  public password:string;
  public loader: boolean
  constructor(public authService: AuthService, private alert: AlertService, public router: Router) {
    this.user = ``;
    this.password = ``
    this.loader = false;
  }

  async ngOnInit(): Promise<any> {
    if (this.authService.getToken() ) {
      await this.router.navigate(['/persons']);
    }
  }

  async login(form) {
    this.alert.clear();
    this.loader = true;
    this.authService.login({email: this.user, password: this.password}).subscribe(res =>{
      if (res.body) {
        this.authService.setToken(res.body.token);
        this.router.navigate(['/persons']);
      }
      this.loader = false;
    }, err => {
      this.alert.error(err);
      this.loader = false;
    });
  }
}
