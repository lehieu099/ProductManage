import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from '../pages/ProductWorkspace/product.model';
import { catchError } from 'rxjs/operators';

const apiUrl = 'https://61829a8e02f60a001775cdd4.mockapi.io/Product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getProduct(
    pageIndex: number,
    pageSize: number
  ): Observable<Product[]> {
    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('limit', `${pageSize}`);

    return this.http.get<Product[]>(`${apiUrl}`, { params })
      .pipe(catchError(() => of([])));
  };

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(apiUrl).pipe();
  }

  delProduct(id: number): Observable<Product[]> {
    return this.http.delete<Product[]>(apiUrl + '/' + id).pipe(catchError(() => of([])))
  }

  
  constructor(private http: HttpClient) { }

}
