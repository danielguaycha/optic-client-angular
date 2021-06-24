import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../../models/articles.model';
import { ArticleService } from '../../services/articles.service';
import { Category } from '../../../category/models/categories.model';

@Component({
  selector: 'app-edit-person',
  templateUrl: './edit-product.component.html',
})
export class EditArticleComponent implements OnInit {
  public articleId: string;
  public article: Article;
  public category: Category;
  public loader: boolean;

  constructor(private router: ActivatedRoute, private articleService: ArticleService) {
    this.article = null;
  }

  ngOnInit(): void {
    this.router.params.subscribe(routeParams => {
      this.articleId = routeParams.id;
      this.getArticle()
    });
  }

  getArticle() {
    this.loader = true;
    this.articleService.getProduct(this.articleId).subscribe(res => {
      if (res.ok) {
        this.article = res.body;
        this.loader = false;
      }else{
        this.loader = true;
      }
    }, error => {
      // console.log(error);
    })
  }
}
