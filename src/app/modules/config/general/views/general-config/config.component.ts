import { Component, Input, OnInit} from '@angular/core';
import { ToastService } from 'src/app/core/services/toast.service';

import { ConfigService } from '../../services/config.service';
import { SecureStorageService } from '../../../../auth/services/secure-storage.service';
import { ConfigModel } from '../../models/config-general.model';
import * as moment from 'moment';

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

  public config: any;
  public configLoader: boolean = false;

  constructor(private storage: SecureStorageService, private configService: ConfigService, private toast: ToastService) {
    this.formData = {};
  }

  ngOnInit(): void {
    this.getConfig();
  }

  onSubmit(isIVA: boolean) {
    this.loader = true;
    this.saveConfiguration(isIVA);
  }

  getConfig() {
    this.configLoader = true;
    this.configService.getConfig().subscribe(res => {
      if (res.ok) {
        this.config = res.body;
        this.fillFormData();
      }
      this.configLoader = false;
    }, error => {
      this.configLoader = false;
      this.toast.err(error);
    })
  }

  fillFormData() {
    this.formData = {
      ...this.config
    };
  }

  saveConfiguration(isIVA: boolean){
    this.configService.saveConfg(this.formData).subscribe(res => {
      if (res.ok) {
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

  // events
  onSelectFile(event) {
    let file = event.target.files[0];

    if (file.size > MAXIMO_TAMANIO_BYTES) {
      this.toast.warn("El archivo seleccionado excede el tamaño permitido. MAX: 5 MB")
    } else {
      this.formData.cfdi_sign = file;
    }
  }

  onChangeCheck(event) {
    event.target.checked ? this.type = "text" : this.type = "password";
  }

  onCheckEnv(number: number){
    this.formData.cfdi_env = number;
  }

  onCheckSendMail(event){
    event.target.checked ? this.formData.cfdi_send_mail = 1 : this.formData.cfdi_send_mail= 0;
  }
}
