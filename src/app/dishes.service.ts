import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iproduct } from './iproduct';

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  currentCategory: string = 'All'; 

  constructor(private _HttpClient: HttpClient ) { }
  private apiUrl = 'http://localhost:5500/products';

  getMenu(): Observable<any> {
    return this._HttpClient.get('http://localhost:5500/products/');
  }
  getProductById(id: string): Observable<Iproduct> {
    return this._HttpClient.get<Iproduct>(`http://localhost:5500/products/${id}`);
  }  
  getCategories(category: string): Observable<any> {
    this.currentCategory = category; 
    return this._HttpClient.get(`http://localhost:5500/products/category/${category}`);
  }
  updateProduct(id: string, productData: Partial<Iproduct>): Observable<Iproduct> {
    const url = `http://localhost:5500/products/${id}`;
    return this._HttpClient.patch<Iproduct>(url, productData);
  }
  addProduct(product: Iproduct): Observable<Iproduct> {
    return this._HttpClient.post<Iproduct>(this.apiUrl, product);
  }
}
