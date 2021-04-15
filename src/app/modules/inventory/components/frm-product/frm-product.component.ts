import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-frm-product',
  templateUrl: './frm-product.component.html',
})
export class FrmProductComponent implements OnInit {

  @Output() create: EventEmitter<any> = new EventEmitter();
  @Input() formData!:any;

  public loader: boolean = false;
  
  constructor() {
    this.formData = {
        code: '',
        name: '',
        description: '',
        pvp: '',
        price_purchase: '',
        type: '',
        iva: '',
        category_id: '',
        created_at: '',
    };

  }

  ngOnInit(): void {
  }

  onSubmit() {      
  }
}
