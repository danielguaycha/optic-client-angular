import { Component, OnInit } from '@angular/core';
import {InvoiceModel} from '../../../invoice/models/invoice.model';

@Component({
  selector: 'app-create-note-credit',
  templateUrl: './create-note-credit.component.html',
})
export class CreateNoteCreditComponent implements OnInit {
  invoice: InvoiceModel;
  constructor() {
    this.invoice = {
      client_id: 0,
      details: [],
      discount: 0,
      id: 0, iva: 0,
      number: '', subtotal0: 0, subtotalIva: 0
    }
  }

  ngOnInit(): void {
  }

  onSelectInvoice(invoice) {
    this.invoice = invoice;
    console.log(this.invoice);
  }

}
