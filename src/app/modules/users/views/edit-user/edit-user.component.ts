import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from '../../models/users.model';
import { UserService } from '../../services/users.service';

@Component({
    selector: 'frm-edit-user',
    templateUrl: './edit-user.component.html',
})
export class EditUserComponent implements OnInit {
    public userId: string;
    public user: UserModel;
    constructor(private router: ActivatedRoute, private userService: UserService) {
      this.user = null;
    }
  
    ngOnInit(): void {
      this.router.params.subscribe(routeParams => {
        this.userId = routeParams.id;
        this.getPerson()
      });
    }
  
    getPerson() {
      this.userService.getUser(this.userId).subscribe(res => {
        if (res.ok) {
          this.user = res.body;
        }
      }, error => {
        console.log(error);
      })
    }
  
  }
  