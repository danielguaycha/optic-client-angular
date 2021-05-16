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
  @Input() provider: boolean = false

  public loader: boolean = false;
  constructor(private personService : PersonService, private toast: ToastService) {
    this.initData();
  }

  ngOnInit(): void {
    this.formData.is_provider = this.provider ? 'SI' : 'NO';
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
        this.toast.ok(res.message);
        this.initData();
        this.create.emit(res.body);
      }
      this.loader = false;
    }, error => {
      this.loader = false;
      this.toast.err(error);
    })
  }

  initData(){
    this.formData = {
      doc_type: 'CI',
      doc: '',
      name: '',
      business_name: '',
      birthday: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      occupation: '',
      facebook: ''
    };
  }
}
