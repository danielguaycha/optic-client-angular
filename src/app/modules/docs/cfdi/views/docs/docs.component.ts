import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {CfdiModel} from '../../models/cfdi.model';
import {CfdiService} from '../../services/cfdi.service';
import {ToastService} from '../../../../../core/services/toast.service';
import loader from '@angular-devkit/build-angular/src/webpack/plugins/single-test-transform';
import {Tooltip} from 'bootstrap';
import {DocState} from '../../models/doc_state.model';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html'
})
export class DocsComponent implements OnInit {

  public model: CfdiModel;
  public docs: any;
  public loader: boolean = false;
  public states = DocState;
  constructor(private cfdiService: CfdiService, private toast: ToastService) {

  }

  ngOnInit(): void {
    this.docs = [];
    this.model = {
      dateInit : moment().subtract(7, 'd').format('YYYY-MM-DD'),
      dateEnd : moment().format('YYYY-MM-DD'),
      docStatus : 0,
      docType : 1,
    }
  }

  getDocs() {
    this.loader = true;
    this.cfdiService.getDocuments(this.model).subscribe(res => {
      if (res.ok) {
        this.docs = res.body;
        console.log(this.docs);
      }
      this.loader = false;
    }, error =>  {
      this.loader = false;
      this.toast.err(error);
    })
  }

  // invoice
  verifyInvoice(invoiceId: number) {
    this.loader = true;
    this.cfdiService.invoiceVerify(invoiceId).subscribe(res => {
      if (res.ok) {
        if (res.body.auth) {
          this.toast.ok(res.message)
        } else {
          this.toast.info(`La factura (${invoiceId}) no esta autorizada`)
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

}
