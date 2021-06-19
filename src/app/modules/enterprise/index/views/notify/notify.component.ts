import { Component, OnInit } from '@angular/core';
import {NotifyService} from '../../services/notify.service';
import {NotifyModel} from '../../models/notify.model';
import {ToastService} from '../../../../../core/services/toast.service';
import {ConfirmService} from '../../../../../core/services/confirm.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
})
export class NotifyComponent implements OnInit {
  loader: boolean = false;
  notifies: Array<NotifyModel>
  constructor(public notifyServ: NotifyService,
              private toast: ToastService, private confirm: ConfirmService) {
    this.notifies = [];
  }

  ngOnInit(): void {
    this.getNotifies();
  }

  getNotifies() {
    this.loader = true;
    this.notifyServ.getNotifies().subscribe(res=> {
      if (res.ok) {
        this.notifies = res.body
      }
    }, error => {
      this.toast.err(error);
    }, () => this.loader = false)
  }

  deleteNotify(id) {
    this.confirm.confirm("¿Esta seguro de que desea eliminar esta notificación?", () => {
      this.notifyServ.removeNotify(id).subscribe(res => {
        if (res.ok) {
          this.toast.ok(res.message);
          const index = this.notifies.findIndex(i => i.id === id);
          if (index >= 0) this.notifies.splice(index, 1);
        }
      }, error => {
        this.toast.err(error);
      })
    })
  }

}
