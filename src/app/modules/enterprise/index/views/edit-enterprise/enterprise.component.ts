import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxImageCompressService } from 'ngx-image-compress';
import { ToastService } from 'src/app/core/services/toast.service';
import { ValidateService } from 'src/app/core/services/validate.service';
import { environment } from 'src/environments/environment';
import { EnterpriseModel } from '../../models/enterprise.model';
import { EnterpriseService } from '../../services/enterprise.service';

const defaultImage = '../../../../../assets/img/icon.png';
const MAXIMO_TAMANIO_BYTES = 10000000; // 1MB = 1 millón de bytes
@Component({
  selector: 'frm-enterprise',
  templateUrl: './enterprise.component.html',
})
export class EnterpriseComponent implements OnInit {
  @Input() formData!: EnterpriseModel;

  public micro_enterprise: boolean = true;
  public accounting: boolean = false;
  public cod_serie:string = "";
  public cod_est:string = "0";
  public pto_est:string = "0";
  public imageProfile = '';

  public loader: boolean = false;
  constructor(private enterpriseService: EnterpriseService, private toast: ToastService, private sanitizer: DomSanitizer, private imageCompress: NgxImageCompressService) {

  }

  ngOnInit(): void {
    this.loader = false;
    this.micro_enterprise = this.formData.micro_enterprise == "SI" ;
    this.accounting = this.formData.accounting == "SI";
    this.imageProfile = `${environment.apiUrl}/image?path=/${this.formData.logo}&default=true`
    this.formData.authorization == "null" ? this.formData.authorization = "" : null ;
    this.formData.special_contrib == "null" ? this.formData.special_contrib = "" : null ;
    this.formData.retention_agent == "null" ? this.formData.retention_agent = "" : null ;
    this.isNumber(this.formData.codEst) ? this.cod_est = this.formData.codEst : this.cod_est = "0";
    this.isNumber(this.formData.ptoEmi) ? this.pto_est = this.formData.ptoEmi : this.pto_est = "0";
    this.addSerie();
  }

  changeImage(value) {
    this.imageProfile = defaultImage;
  }

  onSubmit() {
    if(Number.parseInt(this.cod_est) <= 0 || Number.parseInt(this.pto_est) <= 0){
      this.toast.warn("El codigo de establecimiento y punto de emision debe ser solo numeros enteros positivos");
      return
    }
    this.updateEnterprise();
  }

  fileEvent(event) {
    let file = (<HTMLInputElement>event.target).files[0];
    if (file.size > MAXIMO_TAMANIO_BYTES) {
      this.toast.warn(`La imagen seleccionada excede el tamaño permitido. MAX: ${MAXIMO_TAMANIO_BYTES/1000000} MB`)
    } else {
      this.extraerBase64(file).then((image: any) => {
        this.imageProfile = image.base;
        this.formData.logo = file;
      });
    }
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
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
      if (res.ok) {
        this.formData = res.body;
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

  onInputCode(value) {
    this.isNumber(value)? this.cod_est = value : this.cod_est = "0";
    this.addSerie();
  }
  onInputPto(value) {
    this.isNumber(value)? this.pto_est = value : this.pto_est = "0";
    this.addSerie();
  }

  addSerie(){
    this.cod_serie = this.addZero(Number.parseInt(this.cod_est), 3)+"-"+this.addZero(Number.parseInt(this.pto_est), 3);
  }

  isNumber(value):boolean{
    return !isNaN(parseFloat(value)) && isFinite(value);
  }

  numberOnly(event):boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  addZero(number: number, limit: number):string {
    let lenght = number.toString().length;
    return `${"0".repeat(limit-lenght)}${number}`
  }

  initFormData() {
    this.formData = {
      id: null,
      ruc: "",
      name: "",
      business_name: "",
      address: "",
      logo: null,
      email: "",
      authorization: "",
      special_contrib: "",
      retention_agent: "",
      accounting: "",
      micro_enterprise: "",
      last_connection: "",
      ptoEmi: "",
      codEst: "",
      addressEst: ""
    };
  }
}
