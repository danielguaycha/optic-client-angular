import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast.service';
import { UserModel } from '../../models/users.model';
import { UserService } from '../../services/users.service';

@Component({
    selector: 'app-frm-user',
    templateUrl: './form-user.component.html',
})
export class FormUserComponent implements OnInit {
    @Input() formData!: UserModel;
    @Input() edit: boolean = false;

    public loader: boolean = false;
    constructor(private roleService: UserService, private toast: ToastService) {

    }

    ngOnInit(): void {
        this.initFormData();
    }

    onSubmit() {
        this.savePermissions();
    }

    savePermissions(){
        this.loader = true;
        this.roleService.saveUser(this.formData).subscribe(res => {
          if (res.ok) {
            this.initFormData();
            this.toast.ok(res.message);
          }
          this.loader = false;
        }, error => {
          this.loader = false;
          this.toast.err(error);
        })
    }

    onCheckPermiso(value, isChecked: boolean){
        if(isChecked){
            // this.formData.permissions.push(Number(value));
        }else{
            // var i = this.formData.permissions.indexOf( Number(value) );
            // this.formData.permissions.splice( i, 1 );
        }
    }
    initFormData() {
        this.formData = {
          id: null,
          fullName: '',
          username: '',
          password: '',
        };
    }
}
