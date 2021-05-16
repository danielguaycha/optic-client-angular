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
  public loader: boolean = false;
  constructor(private router: ActivatedRoute, private personService: PersonService) {
    this.person = {}
  }

  ngOnInit(): void {
    this.router.params.subscribe(routeParams => {
      this.loader = true;
      this.personId = routeParams.id;
      this.getPerson()
    });
  }

  getPerson() {
    this.personService.getPerson(this.personId).subscribe(res => {
      if (res.ok) {
        this.person = res.body;
      this.loader = false;
      }
    }, error => {
      // console.log(error);
    })
  }

}
