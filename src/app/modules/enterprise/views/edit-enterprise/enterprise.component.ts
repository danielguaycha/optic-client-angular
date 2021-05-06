import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
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

  public micro_enterprise: boolean = true;
  public accounting: boolean = false;

  public defaultImage = '../../../../../assets/img/icon.png';
  public imageProfile = '';

  public loader: boolean = false;
  constructor(private enterpriseService: EnterpriseService, private toast: ToastService, private sanitizer: DomSanitizer) {

  }

  ngOnInit(): void {
    this.loader = false;
    this.micro_enterprise = this.formData.micro_enterprise == "SI" ? true : false;
    this.accounting = this.formData.accounting == "SI" ? true : false;
    this.imageProfile = this.enterpriseService.getLogo(this.formData.logo.toString());
    // this.getEnterprise();
  }

  onSubmit() {
    console.log(this.formData.logo);

    this.updateEnterprise();
    // window.location.reload();
  }

  fileEvent(event){
    // let file = (<HTMLInputElement>event.target).files[0];
    let file = event.target.files[0];

    if(file.type == "image/jpeg" || file.type == "image/png"){
      console.log(file.name);
      console.log(file.type);
      this.formData.logo = file;

      this.extraerBase64(file).then((image:any)=>{
        this.imageProfile = image.base;
        this.formData.logo = image.base;
      });

      // this.imageProfile = file;
    }
  }
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  });

  updateEnterprise(){
      this.loader = true;
      this.enterpriseService.updateEnterprise(this.formData).subscribe(res => {
        if (res.ok) {
          this.formData = res.body;
          console.log(this.formData);      
          this.loader = false;
          this.toast.ok(res.message);
        }
        this.loader = false;
      }, error => {
        this.loader = false;
        this.toast.err(error);
      })        
  }

  onFileChanged(value) {

  }

  onCheckMicro(isChecked: boolean) {
    if (isChecked) {
      this.formData.micro_enterprise = "SI"
    } else {
      this.formData.micro_enterprise = "NO"
    }
  }

  onCheckAccounting(isChecked: boolean) {
    if (isChecked) {
      this.formData.accounting = "SI"
    } else {
      this.formData.accounting = "NO"
    }
  }

  initFormData() {
    this.formData = {
      id: null,
      ruc: '',
      name: '',
      business_name: '',
      address: '',
      logo: null,
      email: '',
      authorization: '',
      special_contrib: '',
      retention_agent: '',
      accounting: '',
      micro_enterprise: '',
      last_connection: '',
    };
  }
}