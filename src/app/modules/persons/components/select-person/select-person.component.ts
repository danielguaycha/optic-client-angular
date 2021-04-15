import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PersonService} from '../../services/person.service';

@Component({
  selector: 'app-select-person',
  templateUrl: './select-person.component.html',
  styleUrls: ['./select-person.component.css']
})
export class SelectPersonComponent implements OnInit {

  @Output() select: EventEmitter<any> = new EventEmitter<any>();

  person: any;
  constructor(private personServ : PersonService) {
    this.person = {
      id: 1,
      doc: '9999999999999',
      name: 'CONSUMIDOR FINAL',
      address: '',
      email: ''
    };
  }

  ngOnInit(): void {
    this.select.emit(this.person);
  }

  onSelect(person) {
    this.person = person;
    this.select.emit(person);
  }

  onPressVerify(key) {
    if (key.keyCode !== 13)
      return;

    this.verifyClient();
  }

  verifyClient() {
      this.personServ.getPerson(this.person.doc).subscribe(res => {
        if (res.ok && res.body) {
          this.person = res.body
        } else {

        }
      });
  }

}
