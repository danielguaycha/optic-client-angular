import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PersonService} from '../../services/person.service';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-person.component.html',
})
export class EditPersonComponent implements OnInit {
  public personId: string;
  public person: any;
  constructor(private router: ActivatedRoute, private personService: PersonService) {
    this.person = {}
  }

  ngOnInit(): void {
    this.router.params.subscribe(routeParams => {
      this.personId = routeParams.id;
      this.getPerson()
    });
  }

  getPerson() {
    this.personService.getPerson(this.personId).subscribe(res => {
      if (res.ok) {
        this.person = res.body;
      }
    }, error => {
      console.log(error);
    })
  }

}
