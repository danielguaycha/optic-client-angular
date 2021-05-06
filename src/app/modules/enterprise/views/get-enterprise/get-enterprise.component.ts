import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast.service';
import { ValidateService } from 'src/app/core/services/validate.service';
import { EnterpriseModel } from '../../models/enterprise.model';
import { EnterpriseService } from '../../services/enterprise.service';

@Component({
    selector: 'get-frm-enterprise',
    templateUrl: './get-enterprise.component.html',
})
export class GetEnterpriseComponent implements OnInit {

    public enterpriseObjet:EnterpriseModel;
    public loader: boolean = false;
    constructor(private enterpriseService: EnterpriseService, private toast: ToastService) {

    }

    ngOnInit(): void {
      this.loader = false;
      this.getEnterprise();
    }
    
    getEnterprise(){
        this.loader = true;
        this.enterpriseService.getEnterprise(1).subscribe(res => {
          if (res.ok) {
            this.enterpriseObjet = res.body;
            this.loader = false;
          }
          this.loader = false;
        }, error => {
          this.loader = false;
          this.toast.err(error);
        })        
    }
}