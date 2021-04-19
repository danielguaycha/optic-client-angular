import { Component, OnInit } from '@angular/core';
import {PersonService} from '../../services/person.service';
import {ConfirmService} from '../../../../core/services/confirm.service';
import {ToastService} from '../../../../core/services/toast.service';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
})
export class ListPersonComponent implements OnInit {
  loader: boolean = false;
  public persons:Array<any> = [];
  constructor(private personService: PersonService, private confirm: ConfirmService,
              private toast: ToastService) {

  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients() {
    this.loader = true;
    this.personService.getPersons().subscribe(res => {
      if (res.ok && res.body.data) {
        this.persons = res.body.data;
      }
      //this.loader.hide();
      this.loader = false;
    }, error => {
      //this.loader.hide();
      this.loader = true;
    })
  }

  onCreateClient(event) {
    this.persons.push(event);
  }

  deletePerson(person) {
    this.confirm.confirm(`¿Está seguro que desea eliminar la persona ${person.name}?`, () => {
      this.personService.deletePerson(person.id).subscribe(res => {
        console.log(res);
        if (res.ok) {
          this.toast.ok(res.message);
        }
      }, err => {
        this.toast.err(err);
      })
    });
  }
}
