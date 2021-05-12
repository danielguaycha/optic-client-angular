import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ToastService } from 'src/app/core/services/toast.service';
import { ValidateService } from 'src/app/core/services/validate.service';
import { EnterpriseModel } from '../../models/enterprise.model';
import { EnterpriseService } from '../../services/enterprise.service';

const defaultImage = '../../../../../assets/img/icon.png';
const MAXIMO_TAMANIO_BYTES = 1000000; // 1MB = 1 millón de bytes
@Component({
  selector: 'frm-enterprise',
  templateUrl: './enterprise.component.html',
})
export class EnterpriseComponent implements OnInit {
  @Input() formData!: EnterpriseModel;

  public micro_enterprise: boolean = true;
  public accounting: boolean = false;
  public cod_serie:string = "";
  public cod_est:string = "";
  public pto_est:string = "";
  public imageProfile = '';

  public loader: boolean = false;
  constructor(private enterpriseService: EnterpriseService, private toast: ToastService, private sanitizer: DomSanitizer, private imageCompress: NgxImageCompressService) {

  }

  ngOnInit(): void {
    this.loader = false;
    this.micro_enterprise = this.formData.micro_enterprise == "SI" ? true : false;
    this.accounting = this.formData.accounting == "SI" ? true : false;
    // this.imageProfile = this.enterpriseService.getLogo(this.formData.logo.toString());
  }
  changeImage(value) {
    this.imageProfile = defaultImage;
  }

  onSubmit() {
    this.updateEnterprise();
  }

  fileEvent(event) {
    let file = (<HTMLInputElement>event.target).files[0];
    
    // file.name = file.name.replace(' ','');
    if (file.size > MAXIMO_TAMANIO_BYTES) {
      this.toast.warn("La imagen seleccionada excede el tamaño permitido. MAX: 1 MB")
    } else {
      this.extraerBase64(file).then((image: any) => {
        this.imageProfile = image.base;
        this.formData.logo = file;
      });
    }
  }

  resizeBase64Img(base64, newWidth, newHeight) {
    return new Promise((resolve, reject)=>{
        var canvas = document.createElement("canvas");
        canvas.style.width = newWidth.toString()+"px";
        canvas.style.height = newHeight.toString()+"px";
        let context = canvas.getContext("2d");
        let img = document.createElement("img");
        img.src = base64;
        img.onload = function () {
            context.scale(newWidth/img.width,  newHeight/img.height);
            context.drawImage(img, 0, 0); 
            resolve(canvas.toDataURL());               
        }
    });
}

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result,
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

  updateEnterprise() {
    this.loader = true;
    this.enterpriseService.updateEnterprise(this.formData).subscribe(res => {
      console.log(res);
      if (res.ok) {
        this.formData = res.body;
        console.log(res.body);
        this.loader = false;
        this.toast.ok(res.message);
      }
      this.loader = false;
    }, error => {
      this.loader = false;
      this.toast.err(error);
    })
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
  
  onInputCode(value: string) {
    this.cod_est = value;
    this.cod_serie = `${this.cod_est}-${this.pto_est}`;
  }
  onInputPto(value: string) {
    this.pto_est = value;
    this.cod_serie = `${this.cod_est}-${this.pto_est}`;
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
      ptoEmi: '',
      codEst: '',
      addressEst: ''
    };
  }
}