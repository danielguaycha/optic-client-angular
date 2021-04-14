import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PersonService} from '../../services/person.service';
import {ToastService} from '../../../../core/services/toast.service';

@Component({
  selector: 'app-frm-client',
  templateUrl: './frm-person.component.html',
})
export class FrmPersonComponent implements OnInit {

  @Output() create: EventEmitter<any> = new EventEmitter();
  @Input() formData!:any;
  @Input() edit:boolean = false;

  public loader: boolean = false;
  constructor(private personService : PersonService, private toast: ToastService) {
    this.formData = {
      doc_type: 'CI',
      doc: '',
      name: '',
      business_name: '',
      is_provider: 'NO',
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
  }

  onSubmit() {
    this.loader = true;
    if (!this.edit) this.storePerson();
    if (this.edit) this.updatePerson();
  }

  updatePerson() {
    this.personService.updatePerson(this.formData.id, this.formData).subscribe(res => {
      if (res.ok) {
        this.toast.ok(res.message)
      }
      this.loader = false;
    }, error => {
      this.loader = false;
      this.toast.err(error);
    });
  }

  storePerson() {
    this.personService.savePerson(this.formData).subscribe(res => {
      if (res.ok) {
        this.create.emit(res.body);
        this.toast.ok(res.message);
      }
      this.loader = false;
    }, error => {
      this.loader = false;
      this.toast.err(error);
    })
  }
}
