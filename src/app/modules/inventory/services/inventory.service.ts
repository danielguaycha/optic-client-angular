import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(private http: HttpClient) { }
  //Productos
  getProducts(search: string = null, limit:number = 30): Observable<any> {
    let url = `article?limit=${limit}`;
    if (search) url += `&search=${search}`; // for search product
    return this.http.get(url);
  }

  getProduct(idOrCode, isCode:boolean = false) : Observable<any> {
    let url = `article/${idOrCode}`;
    if (isCode) url+=`?code=true`
    return this.http.get(url);
  }

  saveProduct(data: any) : Observable<any> {
    return this.http.post('article', data);
  }

  //Categorias
  getCategories(search:string): Observable<any> {
    let url = `category?`;
    if (search.trim().length > 0) {
      url+=`search=${search}`
    }
    return this.http.get(url);
  }

  saveCategroy(data: any) : Observable<any> {
    return this.http.post('category', data);
  }

  getCategroy(id) : Observable<any> {
    return this.http.get(`category/${id}`);
  }

  updateCategroy(id, data) : Observable<any> {
    return this.http.put(`categories/${id}`, data);
  }

  deleteCategory(id) : Observable<any>{
    return this.http.delete(`categories/${id}`);
  }
}
