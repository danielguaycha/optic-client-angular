import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {subscribeOn} from 'rxjs/operators';
import {AlertService} from '../../../../core/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  providers: [ AuthService ]
})
export class LoginComponent implements OnInit {

  public user:string;
  public password:string;
  constructor(public authService: AuthService, private alert: AlertService) {
    this.user = ``;
    this.password = ``
  }

  ngOnInit(): void {
  }

  login(form) {
    this.authService.login({email: this.user, password: this.password}).subscribe(res =>{
      console.log(res);
    }, err => {
      this.alert.error(err);
    });
  }
}
