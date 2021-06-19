import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {InvoiceService} from '../../services/invoice.service';
import {ToastService} from '../../../../../core/services/toast.service';

@Component({
  selector: 'app-select-invoice',
  templateUrl: './select-invoice.component.html',
})
export class SelectInvoiceComponent implements OnInit {
  @Output() onSelect : EventEmitter<any> = new EventEmitter();
  @Input() withDetails: boolean  = false;
  invoice : any;
  constructor(private invService: InvoiceService, private toast: ToastService) {
    this.initComponents();
  }

  ngOnInit(): void {
  }

  onSelectInvoice(inv) {
    this.invoice = inv;
    if (!this.withDetails) {
      this.onSelect.emit(inv);
    } else {
      this.getCompleteInvoice(inv.id);
    }
  }

  initComponents() {
    this.invoice = {
      client: '',
      client_id: -1,
      ruc: '',
      id: -1,
      number: ''
    }
  }

  getCompleteInvoice(id) {
    this.invService.show(id).subscribe(res => {
      if (res.ok) {
        this.onSelect.emit(res.body);
      }
    }, error => {
      this.toast.err(error);
    });
  }
}
