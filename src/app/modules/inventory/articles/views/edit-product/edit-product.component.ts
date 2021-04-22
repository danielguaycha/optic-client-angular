import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { Articles } from '../../models/articles.model';
import {ArticleService} from '../../services/articles.service';
import { CategoryService } from '../../../category/services/category.service';
import { Category } from '../../../category/models/categories.model';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-product.component.html',
})
export class EditArticleComponent implements OnInit {
  public articleId: string;
  public article: Articles;
  public category: Category;
  constructor(private router: ActivatedRoute, private articleService: ArticleService, private categoryService: CategoryService) {
    this.article = null;
  }

  ngOnInit(): void {
    this.router.params.subscribe(routeParams => {
      this.articleId = routeParams.id;
      this.getArticle()
    });
  }

  getArticle() {
    this.articleService.getProduct(this.articleId).subscribe(res => {
      if (res.ok) {
        this.article = res.body; 
        this.getCategory(this.article.category_id);       
      }
    }, error => {
      console.log(error);
    })
  }

  getCategory(id){
    this.categoryService.getCategory(id).subscribe(res => {
      if (res.ok) {
        this.category = res.body;        
      }
    }, error => {
      console.log(error);
    })
  }
}
