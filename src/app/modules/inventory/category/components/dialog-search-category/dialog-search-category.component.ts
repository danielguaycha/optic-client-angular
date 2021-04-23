import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalComponent} from '../../../../../core/components/modal/modal.component';
import { Category } from '../../models/categories.model';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-dialog-search-category',
  templateUrl: './dialog-search-category.component.html',
})
export class DialogSearchCategoryComponent implements OnInit {
  @Output() select: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(ModalComponent) child:ModalComponent;

  search:string;
  public categories:Array<Category> = [];
  public loader: boolean = false;
  constructor(private categoryService: CategoryService) {
    this.search = ``;
  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    // const modal = document.getElementById('modalSearchCategory');
    // modal.addEventListener('shown.bs.modal', function() {
    //   document.getElementById('search').focus();
    // });
  }

  searchCategory() {
    this.categories = [];
    if (this.search.length < 2) return;
    this.loader = true;
    this.categoryService.getCategories(this.search).subscribe(res => {
      if (res.ok) {
        this.categories = res.body;
        this.loader = false;
      }
    }, error => {
      this.loader = false;
      console.log(error);
    })
  }

  ListCategory() {
    this.categories = [];
    this.categoryService.getCategories("").subscribe(res => {
      if (res.ok){
        this.categories = res.body;
      }
    }, error => {
      this.loader = false;
      console.log(error);
    })
  }

  onEnterPress(key) {
    if (key.keyCode !== 13) return;
    const btn = document.getElementById(`addCategory0`);
    if (btn)
      btn.focus();
  }

  onSelectCategory(category) {
    this.select.emit(category);
    this.child.close();
  }
}
