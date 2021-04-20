import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ValidateService } from 'src/app/core/services/validate.service';
import { PermissionModel } from '../../models/permission.model';
import { RolesModel } from '../../models/roles.model';
import { RoleService } from '../../services/roles.service';

@Component({
    selector: 'frm-add-rol',
    templateUrl: './add-rol.component.html',
})
export class AddRolComponent implements OnInit {

    @Input() formData!: RolesModel;
    @Input() edit: boolean = false;

    public loader: boolean = false;
    public permissions: PermissionModel[] = [];
    public tagsModules:Array<[number, string]> = [];
    
    constructor(private roleService: RoleService) {
        this.formData = {
            id: 0,
            name: '',
            description: '',
            permissions: []
        }
    }

    ngOnInit(): void {
        this.getPermissions();
        // this.getTags();
    }

    onSubmit() {
    }
    
    getPermissions() {
        this.roleService.getPermissions().subscribe(res => {
            if (res.ok) {
                this.permissions = res.body;
                console.log(this.permissions);
                this.permissions.forEach(element => {
                    if(element.parent == 0 || element.parent == null){
                        
                        this.tagsModules.push([element.id, element.name])

                        console.log("XXXXX",this.tagsModules);
                    }
                });
            }
        }, error => {
            console.log(error);
        });
    }

    // getTags(){
    //     this.permissions.forEach(element => {
    //         if(element.parent == 0 || element.parent == null){
    //             let x:PermissionModel = {
    //                 id: element.id,
    //                 name: element.name,
    //                 code: null,
    //                 description: null,

    //             } 
    //             this.tagsModules.push(x);
    //         }
    //     });
    // }

    onCheckPermiso(value: string){

        // this.formData.permissions.push(Number(value));
        console.log(value);

    }
}