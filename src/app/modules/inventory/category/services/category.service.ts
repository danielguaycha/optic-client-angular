import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  getCategories(search:string): Observable<any> {
    let url = `category?`;
    if (search.trim().length > 0) {
      url+=`search=${search}`
    }
    return this.http.get(url);
  }
  
  getCategroy(id) : Observable<any> {
    return this.http.get(`category/${id}`);
  }
  
  deleteCategory(id) : Observable<any>{
    return this.http.delete(`category/${id}`);
  }
  
  saveCategroy(data: any) : Observable<any> {
    return this.http.post('category', data);
  }

  updateCategroy(id, data) : Observable<any> {
    return this.http.put(`category/${id}`, data);
  }
}