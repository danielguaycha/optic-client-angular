import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DocModel} from '../../models/doc.model';
import {CfdiService} from '../../services/cfdi.service';
import {ToastService} from '../../../../../core/services/toast.service';
import {DocState} from '../../models/doc_state.model';

@Component({
  selector: 'tr[app-item-cfdi]',
  templateUrl: './item-cfdi.component.html'
})
export class ItemCfdiComponent implements OnInit {
  @Input() doc: DocModel;
  @Output() onCheck: EventEmitter<any> = new EventEmitter<any>();
  public states = DocState;
  loader: boolean = false;

  constructor(private cfdiService: CfdiService, private toast: ToastService) { }

  ngOnInit(): void {
  }

  onSelect(event) {
    this.onCheck.emit({
      doc: {
        id: this.doc.id,
        send_sri: this.doc.send_sri,
        key_access: this.doc.key_access
      },
      check: event.target.checked
    });
  }

  // verify key access
  verifyInvoiceKey(keyAccess : string) {
    this.loader = true;
    this.cfdiService.verifyKeyAccess(keyAccess).subscribe(res => {
      if (res.ok) {
        if (res.body.auth) {
          this.toast.ok(res.message)
        } else {
          this.toast.info(`La factura (${keyAccess}) no esta autorizada`)
        }
      }
      this.loader = false;
    }, error =>  {
      this.loader = false;
      this.toast.err(error);
    })
  }

  authInvoice(invoiceId) {
    this.loader = true;
    this.cfdiService.invoiceAuth(invoiceId).subscribe(res => {
      if (res.ok) {
        this.toast.ok(res.message)
      }
      this.loader = false;
    }, error =>  {
      this.loader = false;
      this.toast.err(error);
    })
  }

  viewRide(invoiceID) {
    const url = this.cfdiService.getIRide(invoiceID);
    window.open(url);
  }

  downloadXML(invoiceID) {
    return this.cfdiService.getXML(invoiceID);
  }
}
