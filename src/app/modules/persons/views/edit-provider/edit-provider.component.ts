import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PersonService} from '../../services/person.service';
import { PersonModel } from '../../models/person.model';

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
})
export class EditProviderComponent implements OnInit {
  public personId: string;
  public person: PersonModel;
  constructor(private router: ActivatedRoute, private personService: PersonService) {
    this.person = {
      doc_type: 'CI',
      doc: '',
      name: '',
      business_name: '',
      is_provider: 'SI',
      birthday: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      occupation: '',
      facebook: ''
    };
  }

  ngOnInit(): void {
    this.router.params.subscribe(routeParams => {
      this.personId = routeParams.id;
      this.getPerson()
    });
  }

  getPerson() {
    this.personService.getPerson(this.personId, true).subscribe(res => {
      if (res.ok && res.body != null) {
        this.person = res.body;
      }else{
        //enviar pagina no encontrada
      }
    }, error => {      
      // console.log(error);
    })
  }

}
