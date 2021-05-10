import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ArticleService} from '../../services/articles.service';
import {ModalComponent} from '../../../../../core/components/modal/modal.component';

@Component({
  selector: 'app-dialog-search-product',
  templateUrl: './dialog-search-product.component.html',
})
export class DialogSearchProductComponent implements OnInit {

  @ViewChild(ModalComponent) modalCmp;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Input() search:string = '';

  articles: Array<any> = [];
  loader: boolean = false;
  modal:any;

  constructor(private productServ: ArticleService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.modal = document.getElementById('modalSearchProducts');
    this.modal.addEventListener('shown.bs.modal', function() {
      document.getElementById('searchProduct').focus();
    });
  }

  hide() {
    this.modalCmp.close();
  }

  show() {
    this.modalCmp.open();
    if (this.search.trim() !== '')
      this.searchProduct();
  }

  searchProduct() {
    this.loader = true;
    this.productServ.getProducts(this.search).subscribe(res => {
      if (res.ok)
        this.articles = res.body;
      this.loader = false;
    }, error => {
      this.loader = false;
    })
  }

  onEnterPress(event){
    if (event.keyCode !== 13) return;
    this.searchProduct();
  }

  onSelectArticle(article) {
    this.onSelect.emit(article);
  }
}
