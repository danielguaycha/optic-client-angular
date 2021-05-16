import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast.service';
import { ConfigService } from '../../services/config.service';
import { SecureStorageService } from '../../../../auth/services/secure-storage.service';
import { ConfigModel } from '../../models/config-general.model';

const MAXIMO_TAMANIO_BYTES = 5000000; // 1MB = 1 millón de bytes
const ENV_PRUEBAS = 1;
const ENV_PRODUCCION = 2;
const SEND_MAIL = 1;
const NOT_SEND_MAIL = 0;

@Component({
  selector: 'app-general-config',
  templateUrl: './config.component.html'
})

export class ConfigEnterpriseComponent implements OnInit {
  @Input() formData!: ConfigModel;
  public loader: boolean = false;
  public send_mail_flag: boolean = false;
  public env_prod_flag: boolean = false;
  public type: string = "password";
  public newdate = new Date();
  constructor(private storage: SecureStorageService, private configService: ConfigService, private toast: ToastService) {
    this.formData = {
      // iva : configService.iva,
      // decimals: configService.decimals,
      // cfdi_env: configService.cfdi_env,
      // cfdi_send_mail: configService.cfdi_send_mail,
      // cfdi_sign_entity: configService.cfdi_sign_entity,
      // cfdi_sign_expire: configService.cfdi_sign_expire,
      // cfdi_business_key: configService.cfdi_business_key,      
    };
  }
  ngOnInit(): void {
    this.formData.iva = this.configService.iva;
    this.formData.decimals = this.configService.decimals;
    this.formData.cfdi_env = this.configService.cfdi_env;
    this.formData.cfdi_send_mail = this.configService.cfdi_send_mail;
    this.formData.cfdi_sign_entity = this.configService.cfdi_sign_entity;
    this.formData.cfdi_sign_expire = this.configService.cfdi_sign_expire;
    this.formData.cfdi_business_key = this.configService.cfdi_business_key;      
    this.formData.cfdi_env == ENV_PRUEBAS ? this.env_prod_flag = true : this.env_prod_flag = false;
    this.formData.cfdi_send_mail == SEND_MAIL ? this.send_mail_flag = true : this.send_mail_flag = false;
    this.formData.cfdi_sign_expire = new Date(this.formData.cfdi_sign_expire).toISOString().split('T')[0];

    // this.initFormData();
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
    isChecked ? this.formData.cfdi_env = ENV_PRUEBAS : this.formData.cfdi_env = ENV_PRODUCCION;
    this.env_prod_flag = isChecked;
  }
  onCheckSendMail(isChecked: boolean){
    isChecked ? this.formData.cfdi_send_mail = SEND_MAIL : this.formData.cfdi_send_mail= NOT_SEND_MAIL;
    this.send_mail_flag = isChecked;
  }

  initFormData() {
    this.formData.cfdi_sign = null;
    this.formData.cfdi_sign_pw = "";
    this.formData.cfdi_business_key = "";
    this.formData.cdfi_wait = 3;
    this.formData.cfdi_env = ENV_PRUEBAS;
    this.formData.cfdi_send_mail = NOT_SEND_MAIL;
  }

}