import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
})
export class CreateInvoiceComponent implements OnInit {

  products: Array<any>;
  formData: any;
  constructor() {
    this.products = [
      {code: '0010010101', name: 'JABON PROTEX 100G', pvp: 1.50, type: 'PRODUCT', iva: 1, stock: 10}
    ];
    this.formData = {
      date: moment().format('YYYY-MM-DD')

    }
  }

  ngOnInit(): void {

  }

  addItem(product: any) {
    this.products.push(product)
  }

}
