import { Component, OnInit } from '@angular/core';
import {ToastService} from '../../../../../core/services/toast.service';
import {SequencesService} from '../../services/sequences.service';
import {Sequence} from '../../models/sequence.model';
import {ConfirmService} from '../../../../../core/services/confirm.service';

@Component({
  selector: 'app-frm-seq',
  templateUrl: './frm-seq.component.html',
})
export class FrmSeqComponent implements OnInit {

  public seqConfig;
  public seqModel;
  public serie: string;
  public disabledInput: boolean = false;
  constructor(private toast: ToastService, private seqService: SequencesService,
              private confirm: ConfirmService) {
    this.seqModel = {
      invoice: 0,
      credit: 0,
      debit: 0,
      remission: 0,
      retention: 0,
      liq_buys: 0,
      n_sales: 0,
      proforma: 0
    };
  }

  ngOnInit(): void {
    this.getSequences();
  }

  getSequences () {
    this.disabledInput = true;
    this.seqService.getSequences().subscribe(res => {
      if (res.ok) {
        this.seqConfig = res.body;
        this.seqModel.invoice = this._getDoc(Sequence.SEQ_INVOICE);
        this.seqModel.credit = this._getDoc(Sequence.SEQ_NOTE_CREDIT);
        this.seqModel.debit = this._getDoc(Sequence.SEQ_NOTE_DEBIT);
        this.seqModel.remission = this._getDoc(Sequence.SEQ_G_REMISSION);
        this.seqModel.retention = this._getDoc(Sequence.SEQ_RETENTION);
        this.seqModel.liq_buys = this._getDoc(Sequence.SEQ_LIQ_BUY);
        this.seqModel.n_sales = this._formatSeq(1);
        this.seqModel.proforma = this._formatSeq(1);
        this.serie = res.body.office.serie;
      }
    }, error => {
      console.log(error);
    }, () => {
      this.disabledInput = false;
    })
  }

  resetSequences() {
    this.confirm.confirm("¿Está seguro que desea reiniciar todos los secuenciales?", () => {
      this.disabledInput = true;
      this.seqService.resetSeq(this.serie).subscribe(res => {
        if (res.ok) {
          this.toast.ok(res.message);
        }
        this.disabledInput = false;
      }, error => {
        this.disabledInput = false;
        this.toast.err(error);
      })
    });
  }

  updateSeq() {
    if (!this._validateSeq()) return;
    this.disabledInput = true;
    this.seqService.updateSeq(this.seqModel).subscribe(res => {
      if (res.ok) {
        this.disabledInput = false;
        this.toast.ok(res.message)
      }
    }, error => {
      this.disabledInput = false;
      this.toast.err(error);
    })
  }

  private _validateSeq() {
    const regex = /([0-9]{9})/;
    let fails = [];
    if (!regex.test(this.seqModel.invoice)) {
      fails.push('Facturas');
    }
    if (!regex.test(this.seqModel.credit)) {
      fails.push('N. Crédito');
    }
    if (!regex.test(this.seqModel.debit)) {
      fails.push('N. Débito');
    }
    if (!regex.test(this.seqModel.retention)) {
      fails.push('C. Retención');
    }
    if (!regex.test(this.seqModel.remission)) {
      fails.push('G. Remisión');
    }
    if (!regex.test(this.seqModel.liq_buys)) {
      fails.push('Liq. Compras');
    }

    if (fails.length > 0) {
      this.toast.err(`La/Las secuencias de:: ${fails.join(", ")} :: tiene formato incorrecto, use solo números hasta 9 dígitos`);
      return false;
    }
    return true;
  }

  public _formatSeq(number: number) {
    const num = number.toString();
    let cod = "";
    for (let i=0; i<9-(num.length); i++) {
        cod+="0";
    }
    return cod+num;
  }

  private _getDoc(doc: string) {
      for(let seq of this.seqConfig.seq) {
        if (seq.doc === doc) {
          return this._formatSeq(seq.seq);
        }
      }
      return this._formatSeq(0);
  }
}
