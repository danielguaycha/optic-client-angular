import {Component, Input, OnInit} from '@angular/core';
import {ClinicalFileModel} from '../../models/clinical_file.model';
import * as moment from 'moment';
import {OptometryService} from '../../services/optometry.service';
import {ToastService} from '../../../../../core/services/toast.service';

@Component({
  selector: 'app-frm-integral',
  templateUrl: './frm-integral.component.html',
  styleUrls: ['./frm-integral.component.css']
})
export class FrmIntegralComponent implements OnInit {
  public formData: any;
  loader: boolean;
  @Input() edit: boolean |false;
  @Input() fileClinical: any | undefined;
  constructor(
    private toast: ToastService,
    public integralService: OptometryService
  ) {
  }

  ngOnInit(): void {
    this.initComponents();
    if (this.fileClinical !== undefined){
      this.loadData(this.fileClinical);
      console.log('this.fileClinical');
      console.log(this.fileClinical);
    }

  }

  initComponents(): void {
    console.log('limpiar');
    this.formData = {
      client_id: -1,
      date: moment().format('YYYY-MM-DD'),
      number: 1,
      description: '',
      od_esfera: '',
      od_cilindro: '',
      od_eje: '',
      od_dne: '',
      oi_esfera: '',
      oi_cilindro: '',
      oi_eje: '',
      oi_dne: '',
      add: '',
      tipo_lente: '',
      alt: '',
      observacion: '',
    };
  }

  loadData(data: any): void{
    console.log('accedió');
    this.formData.client_id = data.client.id;
    this.formData.integral_rxs_id = data.integral_rxs.id;
    this.formData.date = data.date;
    this.formData.number = data.number;
    this.formData.description = data.description;
    this.formData.od_esfera = data.integral_rxs.od_esfera;
    this.formData.od_cilindro = data.integral_rxs.od_cilindro;
    this.formData.od_eje = data.integral_rxs.od_eje;
    this.formData.od_dne = data.integral_rxs.od_dne;
    this.formData.oi_esfera = data.integral_rxs.oi_esfera;
    this.formData.oi_cilindro = data.integral_rxs.oi_cilindro;
    this.formData.oi_eje = data.integral_rxs.oi_eje;
    this.formData.oi_dne = data.integral_rxs.oi_dne;
    this.formData.add = data.integral_rxs.add;
    this.formData.tipo_lente = data.integral_rxs.tipo_lente;
    this.formData.alt = data.integral_rxs.alt;
    this.formData.observacion = data.integral_rxs.observacion;
  }


  // events
  onSelectPerson(person: any): void{
    console.log(person);
    if (person.id !== undefined){
      console.log('Accedio a ingresar la persona');
      this.formData.client_id = person.id;
    }
  }

  onSubmit(): void{
    console.log(this.formData);
    if (this.formData.client_id === -1){
      this.toast.warn('Debe seleccionar un Paciente');
      return;
    }
    if (this.edit === true){
      this.integralService.update(this.formData).subscribe(res => {
        if (res.ok) {
          this.toast.ok(res.message);
        }
        this.loader = false;
      }, error => {
        this.loader = false;
        this.toast.err(error);
      });
    }else{
      this.integralService.store(this.formData).subscribe(res => {
        if (res.ok) {
          this.toast.ok(res.message);
          console.log(res);
          this.initComponents();
        }
        this.loader = false;
      }, error => {
        this.loader = false;
        this.toast.err(error);
      });
    }
  }



}
