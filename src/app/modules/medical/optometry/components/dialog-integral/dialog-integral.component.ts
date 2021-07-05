import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dialog-integral',
  templateUrl: './dialog-integral.component.html',
  styleUrls: ['./dialog-integral.component.css']
})
export class DialogIntegralComponent implements OnInit {

  public title: string;
  @Input() edit: boolean | false;
  @Input() fileClinical: any | undefined;
  @Input() idModal: string;
  constructor() { }

  ngOnInit(): void {
    console.log('this.edit');
    console.log(this.edit);
    if (!this.edit){
      this.title = 'Agregar História Clínica Integral';
    }else{
      this.title = 'Editar História Clínica Integral';
    }
  }



}
