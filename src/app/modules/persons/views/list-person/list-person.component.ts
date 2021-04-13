import { Component, OnInit } from '@angular/core';
import {PersonService} from '../../services/person.service';

@Component({
  selector: 'app-list-person',
  templateUrl: './list-person.component.html',
})
export class ListPersonComponent implements OnInit {

  public loader:boolean;
  public persons:Array<any> = [];
  constructor(private personService: PersonService) {

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
    }, error => {
      this.loader = false;
    })
  }

  onCreateClient(event) {
    this.persons.push(event);
    
  }
}
