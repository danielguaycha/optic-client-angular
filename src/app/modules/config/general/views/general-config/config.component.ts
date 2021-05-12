import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast.service';
import { ConfigService } from '../../services/config.service';
import { SecureStorageService } from '../../../../auth/services/secure-storage.service';
import { ConfigModel } from '../../models/config-general.model';

const MAXIMO_TAMANIO_BYTES = 5000000; // 1MB = 1 millón de bytes
@Component({
  selector: 'app-general-config',
  templateUrl: './config.component.html'
})

export class ConfigEnterpriseComponent implements OnInit {
  @Input() formData!: ConfigModel;
  public loader: boolean = false;
  public type: string = "password";
  constructor(private storage: SecureStorageService, private configService: ConfigService, private toast: ToastService) {
    this.formData = {
      iva : configService.iva,
      decimals: configService.decimals
    };
  }
  ngOnInit(): void { 
    this.initFormData();
  }

  onSelectFile(event) {
    let file = event.target.files[0];

    if (file.size > MAXIMO_TAMANIO_BYTES) {
      this.toast.warn("El archivo seleccionado excede el tamaño permitido. MAX: 5 MB")
    } else {
      this.formData.cfdi_sign = file;
    }
  }

  onSubmit(isIVA: boolean) {
    this.loader = true;
    this.saveConfiguration(isIVA);
  }

  saveConfiguration(isIVA: boolean){
    this.configService.saveConfg(this.formData).subscribe(res => {
      if (res.ok) {
        this.initFormData();
        this.toast.ok(res.message);
        if(isIVA){
          this.configService.iva = res.body.iva;
          this.configService.decimals = res.body.decimals;
        }
      }
      this.loader = false;
    }, error => {
      this.loader = false;
      this.toast.err(error);
    })
  }

  onChangeCheck(isChecked: boolean) {
    isChecked ? this.type = "text" : this.type = "password";
  }

  onCheckTest(isChecked: boolean){
    isChecked ? this.formData.cfdi_env = 1 : this.formData.cfdi_env = 2;
  }
  onCheckSendMail(isChecked: boolean){
    isChecked ? this.formData.cfdi_send_mail = 1 : this.formData.cfdi_send_mail= 0;
  }

  initFormData() {
    this.formData.cfdi_sign = null;
    this.formData.cfdi_sign_pw = "";
    this.formData.cfdi_business_key = "";
    this.formData.cdfi_wait = 3;
    this.formData.cfdi_env = 1;
    this.formData.cfdi_send_mail = 0;
  }

}