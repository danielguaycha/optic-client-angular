import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'bs-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() type:string = 'primary'
  @Input() loadingMsg:string = 'Cargando...'
  @Input() loader:boolean = true;
  @Input() width !:string;
  constructor() {

  }

  ngOnInit(): void {
  }

}
