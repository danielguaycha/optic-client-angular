import {Component, Input, OnInit} from '@angular/core';
import {ToastService} from '../../../../../core/services/toast.service';
import {ConfigModel} from '../../models/config-general.model';
import {SecureStorageService} from '../../../../auth/services/secure-storage.service';
import {ConfigService} from '../../services/config.service';

@Component({
  selector: 'app-frm-cfdi',
  templateUrl: './frm-cfdi.component.html',
})
export class FrmCfdiComponent implements OnInit {

  public formData: ConfigModel;
  public loader: boolean = false;
  public type: string = "password";
  public cfdiPw;

  public config: any;
  public configLoader: boolean = false;

  constructor(private storage: SecureStorageService,
              private configService: ConfigService,
              private toast: ToastService) {
    this.formData = {};
    this.cfdiPw = `********`;
  }

  ngOnInit(): void {
    this.getConfig();
  }

  onSubmit() {
    let data = this.formData;
    if (this.cfdiPw.trim().replace("*", '').length >= 8) {
        data.cfdi_sign_pw = this.cfdiPw;
    }
    this.loader = true;
    this.configService.saveConfg(data).subscribe(res => {
      if (res.ok)
        this.toast.ok(res.message);
      this.loader = false;
    }, error => {
      this.loader = false;
      this.toast.err(error);
    })
  }

  getConfig() {
    this.configLoader = true;
    this.configService.getConfig().subscribe(res => {
      if (res.ok) {
        this.config = res.body;
        this.formData = this.config;
        if (this.config.cfdi_has_sign)
          this.cfdiPw = `********` // represent the password is set in db
      }
      this.configLoader = false;
    }, error => {
      this.configLoader = false;
      this.toast.err(error);
    })
  }

  // events
  onSelectFile(event) {
    let file = event.target.files[0];

    if (file.size > 5000000) {
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
