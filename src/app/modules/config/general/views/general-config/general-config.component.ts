import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast.service';
import { ConfigService } from '../../services/config.service';
import { SecureStorageService } from '../../../../auth/services/secure-storage.service';
import { listUrl } from '../../components/main-view/main-view-config.component';
import { ConfigModel } from '../../models/config-general.model';

@Component({
  selector: 'app-general-config',
  templateUrl: './general-config.component.html'
})
export class GeneralConfigComponent implements OnInit {

  @Output() create: EventEmitter<any> = new EventEmitter();
  @Input() formData!:ConfigModel;
  @Input() edit:boolean = false;
  public loader: boolean = false;
  public list = listUrl;
  // public configService: any;
  constructor(private storage: SecureStorageService, private configService : ConfigService, private toast: ToastService) {
    this.formData = {
      iva : configService.iva,
      decimals: configService.decimals
    };
  }

  ngOnInit(): void {
  }

  onSubmit() {
    this.loader = true;
    this.saveConfiguration();
  }

  saveConfiguration(){
    this.configService.saveConfg(this.formData).subscribe(res => {
      if (res.ok) {
        this.create.emit(res.body);
        this.toast.ok(res.message);
        this.formData = res.body;
        this.configService.iva = res.body.iva;
        this.configService.decimals = res.body.decimals;
      }
      this.loader = false;
    }, error => {
      this.loader = false;
      this.toast.err(error);
    })
  }


}
