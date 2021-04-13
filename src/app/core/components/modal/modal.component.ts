import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @Input() title:string = environment.appName;
  @Input() idModal:string;
  @Input() showFooter:boolean = true;
  @ViewChild('closebutton') closebutton;
  public appName: string
  constructor() {
    this.idModal = 'modal';
    this.appName = environment.appName;
  }

  ngOnInit(): void {
    console.log(this.idModal);
  }

  close() {
    this.closebutton.nativeElement.click();
  }

}
