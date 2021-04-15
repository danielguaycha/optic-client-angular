import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html'
})
export class LoaderComponent implements OnInit {
  @Input() loader: boolean = false;
  @Input() variante: string = 'primary';
  @Input() dense: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
