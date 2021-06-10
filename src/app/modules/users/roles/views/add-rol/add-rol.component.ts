import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast.service';
import { PermissionModel } from '../../models/permission.model';
import { RolesModel } from '../../models/roles.model';
import { RoleService } from '../../services/roles.service';

@Component({
    selector: 'frm-add-rol',
    templateUrl: './add-rol.component.html',
})

export class AddRolComponent implements OnInit {
    @ViewChild('permiso2') myDiv: ElementRef;
    @Input() formData!: RolesModel;
    @Input() edit: boolean = false;

    public loader: boolean = false;
    public permissions: PermissionModel[] = [];
    public tagsModules:Array<[number, string]> = [];
    checkBoxValue: boolean = false;
    constructor(private roleService: RoleService, private toast: ToastService) {

    }

    ngOnInit(): void {
        this.getPermissions();
        this.initFormData();
    }

    onSubmit() {
        this.savePermissions();
    }

    savePermissions(){
        this.loader = true;
        this.roleService.saveRoles(this.formData).subscribe(res => {
          if (res.ok) {
            this.initFormData();
            // this.create.emit(res.body);
            this.toast.ok(res.message);
          }
          this.loader = false;
        }, error => {
          this.loader = false;
          this.toast.err(error);
        })
    }

    getPermissions() {
        this.roleService.getPermissions().subscribe(res => {
            if (res.ok) {
                this.permissions = res.body;
                this.permissions.forEach(element => {
                    if(element.parent == 0 || element.parent == null){
                        this.tagsModules.push([element.id, element.name])
                    }
                });
            }
        }, error => {
            // console.log(error);
        });
    }

    checkAllPermissions(value: [number, string], isChecked: boolean){
        this.permissions.forEach( p => {
            if(p.parent == value[0]){
                p.addToRol = isChecked;
            }
        });
    }

    onCheckPermiso(value, isChecked: boolean){
        if(isChecked){
            this.formData.permissions.push(Number(value));
        }else{
            var i = this.formData.permissions.indexOf( Number(value) );
            this.formData.permissions.splice( i, 1 );
        }
    }
    initFormData() {
        this.formData = {
          id: null,
          name: '',
          description: '',
          permissions: []
        };
    }
}
