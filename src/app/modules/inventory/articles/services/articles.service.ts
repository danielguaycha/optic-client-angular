import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  constructor(private http: HttpClient) { }

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
}
