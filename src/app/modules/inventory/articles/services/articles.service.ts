import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Article} from '../models/articles.model';
import {ConfigService} from '../../../enterprise/config/services/config.service';
import {ValidateService} from '../../../../core/services/validate.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient, private cfg: ConfigService, private validate: ValidateService) { }

  saveProduct(data: any): Observable<any> {
    return this.http.post('article', data);
  }

  getProduct(idOrCode, isCode: boolean = false): Observable<any> {
    let url = `article/${idOrCode}`;
    if (isCode) url += `?code=true`
    return this.http.get(url);
  }

  getProducts(search: string = null, limit: number = 30): Observable<any> {
    let url = `article?limit=${limit}`;
    if (search) url += `&search=${search}`; // for search product
    return this.http.get(url);
  }

  updateProducts(id: number, formData): Observable<any> {
    let url = "article/" + id;
    return this.http.put(url, formData);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`article/${id}`);
  }

  calcTotals (article: Article, qty: number, discount: number = 0) {
    let total, totalIva = 0;
    if (discount > (article.pvp * qty)) return {total: 0, totalIva: 0};

    total = (article.pvp * qty) - discount;
    //desc = this.validate.calcPercent(total, this.selectProductCalc.discount);
    if (article.iva === 1)
      totalIva = this.validate.calcPercent(total, this.cfg.iva);
    return {
      total, totalIva
    }
  }
}
