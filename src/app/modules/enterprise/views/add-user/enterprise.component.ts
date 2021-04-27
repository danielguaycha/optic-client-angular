import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast.service';
import { ValidateService } from 'src/app/core/services/validate.service';
import { EnterpriseModel } from '../../models/enterprise.model';
import { EnterpriseService } from '../../services/enterprise.service';

@Component({
    selector: 'frm-enterprise',
    templateUrl: './enterprise.component.html',
})
export class EnterpriseComponent implements OnInit {
    @Input() formData!: EnterpriseModel;
    @Input() edit: boolean = false;

    public defaultImage = '../../../../../assets/img/icon.png';
    public imageProfile = 'https://picsum.photos/id/249/200/200';

    public loader: boolean = false;
    constructor(private enterpriseService: EnterpriseService, private toast: ToastService) {

    }

    ngOnInit(): void {

    }

    onSubmit() {
        this.getEnterprise();
    }
    
    getEnterprise(){
        this.loader = true;
        this.enterpriseService.getEnterprise().subscribe(res => {
          if (res.ok) {
            // this.initFormData();
            this.toast.ok(res.message);
          }
          this.loader = false;
        }, error => {
          this.loader = false;
          this.toast.err(error);
        })        
    }

    onCheckPermiso(isChecked: boolean){
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
          ruc: '',
          nombre_comercial: '',
          razon_social: '',
          telefono: '',
          correo: '',
          direccion: '',
        };
    }
}