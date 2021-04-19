import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'with-loader',
  templateUrl: './with-loader.component.html',
  styleUrls: ['./with-loader.component.css']
})
export class WithLoaderComponent implements OnInit {

  @Input() loader: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
