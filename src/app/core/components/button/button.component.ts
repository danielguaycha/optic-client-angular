import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'bs-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() variant:string = 'primary'
  @Input() loadingMsg:string = 'Cargando...'
  @Input() loader:boolean = false;
  @Input() width !:string;
  @Input() type :string = 'submit';
  constructor() {

  }

  ngOnInit(): void {
  }

}
