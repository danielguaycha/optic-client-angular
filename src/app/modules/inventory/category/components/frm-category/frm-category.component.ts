import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { ToastService } from 'src/app/core/services/toast.service';
import { Category } from '../../models/categories.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-frm-category',
  templateUrl: './frm-category.component.html',
})
export class FrmCategoryComponent implements OnInit {

  @Output() create: EventEmitter<any> = new EventEmitter();
  @Input() edit:boolean = false;
  @Input() formData!:Category;

  public loader: boolean = false;
  
  constructor(private categoryService : CategoryService, private toast: ToastService) {
    this.formData = {
        name: '',
        description: '',        
    };

  }

  ngOnInit(): void {
  }

  onSubmit() {      
    this.loader = true;
    if (!this.edit) this.storeCategory();
    // if (this.edit) this.updatePerson();
  }

  storeCategory() {
    this.categoryService.saveCategroy(this.formData).subscribe(res => {
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