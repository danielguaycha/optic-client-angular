import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {CfdiModel} from '../../models/cfdi.model';
import {CfdiService} from '../../services/cfdi.service';
import {ToastService} from '../../../../../core/services/toast.service';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html'
})
export class DocsComponent implements OnInit {

  public model: CfdiModel;
  public docs: any;
  public loader: boolean = false;
  public checked: Array<any> = [];

  constructor(private cfdiService: CfdiService, private toast: ToastService) {}

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
    this.checked = [];
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

  sendLote() {
    console.log(this.checked);
  }

  onCheckItem(item) {
    if (item.check) {
      this.checked.push(item.doc);
    } else {
      const index = this.checked.findIndex(i => i.id === item.doc.id);
      if (index>=0) this.checked.splice(index, 1);
    }
  }
}
