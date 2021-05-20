import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import typePayment from '../../invoice/models/type.payment';

@Component({
  selector: 'app-monitor-vouchers',
  templateUrl: './monitor-vouchers.component.html'
})

export class MonitorVouchersComponent implements OnInit {
    public formData;
    typePayments: Array<any> = [];

    ngOnInit(){
    this.typePayments = typePayment;
    }
}