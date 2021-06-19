import {Component, OnInit, ViewChild} from '@angular/core';
import * as moment from 'moment';
import {BuyService} from '../services/buy.service';
import {ToastService} from '../../../../core/services/toast.service';
import {InvoiceXml} from '../model/invoice.xml';
import {InvoiceBuy} from '../model/invoice.buy';
import {SelectPersonComponent} from '../../../persons/components/select-person/select-person.component';

@Component({
  selector: 'app-invoice-buys',
  templateUrl: './buys.component.html'
})

export class InvoiceBuysComponent implements OnInit {
  @ViewChild(SelectPersonComponent) SelectPersonCmp:SelectPersonComponent;
    public formData : InvoiceBuy;
    public loader: boolean = false;
    public remoteXML: InvoiceXml;
    public details: any[] = [];

    constructor(private buyServ: BuyService, private toast: ToastService) {
      this.formData = {
        date_emit: '',
        date_end: '',
        discount: 0,
        ice: 0,
        irbp: 0,
        iva: 0,
        key_access: '',
        number: '',
        provider: {address: '', business_name: '', email: '', id: 0, ruc: ''},
        subtotal0: 0,
        subtotal12: 0,
        total: 0
      }
    }

    ngOnInit(){
      //this.getInvoiceByKey("1406202101110381836300110010010000000591234567818");
    }

    getInvoiceByKey(keyAccess: string) {
      this.loader = true;
      this.buyServ.loadKeyAccess(keyAccess).subscribe(res => {
        this.remoteXML = res.body;
        for (let i in this.remoteXML.detalles) {
          const item = this.remoteXML.detalles[i];
          this.details.push(item);
        }
        this.parseXMLData();
      }, error => {
        this.toast.err(error);
      },  () => {
        this.loader = false;
      })
    }

    parseXMLData() {
      // loading head invoice
      this.formData.date_emit = moment(this.remoteXML.infoFactura.fechaEmision, "DD/MM/YYYY").format("YYYY-MM-DD");
      this.formData.number = `${this.remoteXML.infoTributaria.ptoEmi}-${this.remoteXML.infoTributaria.ptoEmi}-${this.remoteXML.infoTributaria.secuencial}`;
      this.formData.key_access = this.remoteXML.infoTributaria.claveAcceso;
      this.formData.provider.business_name = this.remoteXML.infoTributaria.nombreComercial;
      this.formData.provider.address = this.remoteXML.infoFactura.dirEstablecimiento;
      this.formData.provider.ruc = this.remoteXML.infoTributaria.ruc;

      // verify providers
      this.SelectPersonCmp.verifyClient(this.formData.provider.ruc, {
        doc: this.formData.provider.ruc,
        doc_type: 'RUC',
        name: this.formData.provider.business_name,
        business_name: this.formData.provider.business_name,
        address: this.formData.provider.address,
        is_provider: 'SI'
      });
    }
}
