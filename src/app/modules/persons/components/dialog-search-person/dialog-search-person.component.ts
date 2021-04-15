import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {PersonService} from '../../services/person.service';
import {ModalComponent} from '../../../../core/components/modal/modal.component';

@Component({
  selector: 'app-dialog-search-person',
  templateUrl: './dialog-search-person.component.html',
})
export class DialogSearchPersonComponent implements OnInit {
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(ModalComponent) child:ModalComponent;

  search:string;
  persons:any = [];
  public loader: boolean = false;
  constructor(private personServ: PersonService) {
    this.search = ``;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const modal = document.getElementById('modalSearchPerson');
    modal.addEventListener('shown.bs.modal', function() {
      document.getElementById('search').focus();
    });
  }

  searchClient() {
    this.persons = [];
    if (this.search.length < 2) return;
    this.loader = true;
    this.personServ.getPersons(this.search).subscribe(res => {
      if (res.ok) {
        this.persons = res.body.data;
        this.loader = false;
      }
    }, error => {
      this.loader = false;
      console.log(error);
    })
  }

  onEnterPress(key) {
    if (key.keyCode !== 13) return;
    const btn = document.getElementById(`addClient0`);
    if (btn)
      btn.focus();
  }

  onSelectPerson(client) {
    this.select.emit(client);
    this.child.close();
  }
}
