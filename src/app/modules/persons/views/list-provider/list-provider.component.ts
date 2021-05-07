import { Component, Input, OnInit } from '@angular/core';
import {PersonService} from '../../services/person.service';
import {ConfirmService} from '../../../../core/services/confirm.service';
import {ToastService} from '../../../../core/services/toast.service';
import { PersonModel } from '../../models/person.model';

@Component({
  selector: 'app-list-provider',
  templateUrl: './list-provider.component.html',
})
export class ListProviderComponent implements OnInit {
  
  loader: boolean = false;
  public persons:Array<PersonModel> = [];
  constructor(private personService: PersonService, private confirm: ConfirmService,
              private toast: ToastService) {

  }

  ngOnInit(): void {
    this.getProviders();
  }

  getProviders() {
    this.loader = true;
    this.personService.getPersons('',true).subscribe(res => {
      if (res.ok && res.body.data) {
        this.persons = res.body.data;
      }
      this.loader = false;
    }, error => {
      this.loader = true;
    })
  }

  // onCreateClient(event) {
  //   this.persons.push(event);
  // }

  // deletePerson(person) {
  //   this.confirm.confirm(`¿Está seguro que desea eliminar la persona ${person.name}?`, () => {
  //     this.personService.deletePerson(person.id).subscribe(res => {
  //       console.log(res);
  //       if (res.ok) {
  //         this.toast.ok(res.message);
  //       }
  //     }, err => {
  //       this.toast.err(err);
  //     })
  //   });
  // }
}
