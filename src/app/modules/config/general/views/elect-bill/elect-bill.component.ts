import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast.service';
import { ConfigService } from '../../services/config.service';
import { SecureStorageService } from '../../../../auth/services/secure-storage.service';
import { ConfigModel } from '../../models/config-general.model';

const MAXIMO_TAMANIO_BYTES = 5000000; // 1MB = 1 millón de bytes

@Component({
  selector: 'app-general-elect-sign',
  templateUrl: './elect-bill.component.html'
})
export class ElectSignComponent implements OnInit {

  @Output() create: EventEmitter<any> = new EventEmitter();
  @Input() formData!:ConfigModel;
  @Input() edit:boolean = false;
  public loader: boolean = false;
  public type:string = "password";
  // public configService: any;
  constructor(private storage: SecureStorageService, private configService : ConfigService, private toast: ToastService) {
    this.formData = {
      iva: configService.iva,
      decimals: configService.decimals
    }
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
        this.clear();
        this.toast.ok(res.message);
      }
      this.loader = false;
    }, error => {
      this.loader = false;
      this.toast.err(error);
    })
  }

  onSelectFile(event){
    let file = (<HTMLInputElement>event.target).files[0];

    if (file.size > MAXIMO_TAMANIO_BYTES) {
      this.toast.warn("El archivo seleccionado excede el tamaño permitido. MAX: 5 MB")
    } else {
      this.formData.cdfi_signature = file;
    }
  }

  onChangeCheck(isChecked:boolean){
    isChecked? this.type = "text" : this.type = "password";
  }

  clear(){
    this.formData.cdfi_signature = null;
    this.formData.cdfi_password = "";
  }


}
