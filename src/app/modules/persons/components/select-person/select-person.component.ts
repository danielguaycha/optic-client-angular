import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {PersonService} from '../../services/person.service';
import {DialogAddPersonComponent} from '../dialog-add-person/dialog-add-person.component';

@Component({
  selector: 'app-select-person',
  templateUrl: './select-person.component.html',
  styleUrls: ['./select-person.component.css']
})
export class SelectPersonComponent implements OnInit {
  @ViewChild(DialogAddPersonComponent) PersonCmp: DialogAddPersonComponent;

  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  @Input() loadFinalCostumer?: boolean = true;
  @Input() provider: boolean = false;
  formDataPerson: any = {};
  person: any;
  constructor(private personServ : PersonService) {}

  ngOnInit(): void {
    this.initComponents();
    this.select.emit(this.person);
  }

  initComponents() {
    if (this.loadFinalCostumer) {
      this.person = {
        id: 1,
        doc: '9999999999999',
        name: 'CONSUMIDOR FINAL',
        address: '',
        email: ''
      };
    } else {
      this.person = {}
    }
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

  verifyClient(doc: string = null, setExtra = {}) {
      if (!doc) doc = this.person.doc;
      else this.person.doc = doc;
      this.personServ.getPerson(doc, this.provider).subscribe(res => {
        if (res.ok && res.body) {
          this.person = res.body
          this.onSelect(this.person);
        } else {
          // open window
          console.log(setExtra);
          this.PersonCmp.open();
          this.formDataPerson = setExtra;
        }
      });
  }
}
