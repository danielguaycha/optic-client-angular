import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ConfigService} from '../../../../../enterprise/config/services/config.service';
import {ValidateService} from '../../../../../../core/services/validate.service';

@Component({
  selector: 'partial-frm-prices',
  templateUrl: './frm-prices.component.html'
})
export class FrmPricesComponent implements OnInit {
  @Output() onChange : EventEmitter<any> = new EventEmitter();
  @Input() hasIva: boolean = false;
  @Input() edit?: boolean = false;

  public utilidad: number = 0;
  @Input() price: number = 0;
  public priceIva: number = 0;
  @Input() pvp1: number = 0;
  public pvp1Iva: number = 0;

  constructor(private config: ConfigService, public validate: ValidateService) {}

  ngOnInit(): void {
    if (!this.edit)
      this.initComponents();
  }

  ngOnChanges(props){
    if (props.hasIva) {
      this.hasIva = (props.hasIva.currentValue);
      if(props.hasIva.previousValue !== props.hasIva.currentValue) {
        this.calcPriceIva();
        //this.calcUtility();
      }
    }
    this.initFormDataEdit()
  }

  calcPriceIva() {
    if (this.hasIva)
      this.priceIva = this.validate.addPercent(this.price, this.config.iva);
    else
      this.priceIva = this.price;
    if (this.utilidad > 0) this.calcUtility();
  }

  calcUtility() {
    if (this.utilidad <= 0) {
      this.pvp1 = this.priceIva;
      this.pvp1Iva = this.validate.addPercent(this.pvp1, 0);
      return;
    }
    this.pvp1 = this.validate.addPercent(this.price, this.utilidad);
    if (this.hasIva)
      this.pvp1Iva = this.validate.addPercent(this.pvp1, this.config.iva);
    else
      this.pvp1Iva = this.pvp1;
  }

  calcFinalPrice() {
    if(this.pvp1Iva && this.pvp1Iva > this.price) {
      this.pvp1 = this.priceIva;
      this.utilidad = this.validate.getPercent(this.pvp1Iva, this.pvp1);
      this.pvp1 = this.validate.getNeto(this.pvp1Iva, this.utilidad);
    } else {
      this.utilidad = 0;
    }
  }

  // utils
  emit() {
    if (this.onChange && this.price > 0 && this.pvp1 > 0) {
      this.onChange.emit({
        price: this.price,
        pvp1: this.pvp1
      })
    }
  }

  // init on edit
  initFormDataEdit() {
    if (!this.edit) return;
    this.utilidad = this.validate.getPercent(this.pvp1, this.price);
    this.calcUtility();
  }

  initComponents() {
    this.utilidad = 0;
    this.price = 0;
    this.priceIva = 0;
    this.pvp1 = 0;
    this.pvp1Iva = 0;
  }
}
