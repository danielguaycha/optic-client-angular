import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {AlertService} from '../../../../core/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: []
})
export class LoginComponent implements OnInit {

  startImageUrl = '../assets/img/logo.svg';

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
    this.authService.login({username: this.user, password: this.password}).subscribe(res =>{
      if (res.body) {
        this.authService.setToken(res.body.token);
        this.authService.getLoginUser();
        this.router.navigate(['/persons']);
      }
      this.loader = false;
    }, err => {
      this.alert.error("El usuario o contraseña son incorrectos");
      this.loader = false;
    });
  }
}
