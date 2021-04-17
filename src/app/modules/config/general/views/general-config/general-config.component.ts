import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastService } from 'src/app/core/services/toast.service';
import { ConfirmService } from '../../../../../core/services/confirm.service';
import { ConfigService } from '../../services/config.service';

@Component({
  selector: 'app-general-config',
  templateUrl: './general-config.component.html'
})
export class GeneralConfigComponent implements OnInit {



  @Output() create: EventEmitter<any> = new EventEmitter();
  @Input() formData!:any;
  @Input() edit:boolean = false;
  public loader: boolean = false;
  
  constructor(private configService : ConfigService, private toast: ToastService) {
    this.formData = {
      iva: 0,
      decimals: 0
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
        this.create.emit(res.body);
        this.toast.ok(res.message);
      }
      this.loader = false;
    }, error => {
      this.loader = false;
      this.toast.err(error);
    })
  }


}
