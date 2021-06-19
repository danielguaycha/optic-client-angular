import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {InvoiceService} from '../../services/invoice.service';
import {ModalComponent} from '../../../../../core/components/modal/modal.component';

@Component({
  selector: 'app-dialog-search-invoice',
  templateUrl: './dialog-search-invoice.component.html',
})
export class DialogSearchInvoiceComponent implements OnInit {
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @ViewChild(ModalComponent) modal : ModalComponent;
  public query : string;
  public loader: boolean = false;
  public invoices: Array<any> = [];
  constructor(public invServ: InvoiceService) { }

  ngOnInit(): void {
  }

  search() {
    if (!this.query || this.query.trim().length <= 0) return;
    this.loader = true;
    this.invoices = [];
    this.invServ.search(this.query).subscribe(res => {
      if (res.ok) {
        this.invoices = res.body;
      }
    }, error =>  {
      console.log(error);
    }, () => {
      this.loader = false;
    })
  }

  emit(invoice) {
    this.onSelect.emit(invoice);
    this.modal.close();
  }

}
