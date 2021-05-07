import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ConfirmService } from 'src/app/core/services/confirm.service';
import { ToastService } from 'src/app/core/services/toast.service';
import { ValidateService } from 'src/app/core/services/validate.service';
import { UserModel } from '../../models/users.model';
import { UserService } from '../../services/users.service';

@Component({
  selector: 'frm-list-user',
  templateUrl: './list-user.component.html',
})
export class ListUserComponent implements OnInit {
  @Input() formData!: UserModel;
  @Input() edit: boolean = false;

  public arrayUsers: Array<UserModel> = [];
  public loader: boolean = false;
  constructor(private roleService: UserService, private toast: ToastService, private confirm: ConfirmService,) {

  }

  ngOnInit(): void {
    this.listUsers();
  }

  onSubmit() {
  }

  listUsers() {
    this.loader = true;
    this.roleService.listUsers().subscribe(res => {
      if (res.ok) {
        this.arrayUsers = res.body.data;
        this.toast.ok(res.message);
      }
      this.loader = false;
    }, error => {
      this.loader = false;
      this.toast.err(error);
    })
  }

  onCreateUser(event) {
    this.arrayUsers.push(event);
  }

  deleteUser(user: UserModel) {
    this.confirm.confirm(`¿Está seguro que desea eliminar al usuario ${user.username}?`, () => {
      this.loader = true;
      this.roleService.deleteUser(user.id).subscribe(res => {
        if (res.ok) {
          const index = this.arrayUsers.indexOf(user, 0);
          if (index > -1) {
            this.arrayUsers.splice(index, 1);
          }
          this.toast.ok(res.message);
        }
        this.loader = false;
      }, error => {
        this.loader = false;
        this.toast.err(error);
      });
    });
  }

  initFormData() {
    this.formData = {
      id: null,
      username: '',
      fullName: '',
      password: '',
    };
  }
}