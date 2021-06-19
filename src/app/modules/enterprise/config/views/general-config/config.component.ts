import { Component, Input, OnInit} from '@angular/core';
import { ToastService } from 'src/app/core/services/toast.service';

import { ConfigService } from '../../services/config.service';
import { SecureStorageService } from '../../../../auth/services/secure-storage.service';
import { ConfigModel } from '../../models/config-general.model';



@Component({
  selector: 'app-general-config',
  templateUrl: './config.component.html'
})

export class ConfigGeneralComponent implements OnInit {
 public formData: ConfigModel;

  public loader: boolean = false;
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


}
