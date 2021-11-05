import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Product } from './product.model';
import { catchError, filter } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  apiUrl = 'https://61829a8e02f60a001775cdd4.mockapi.io/Product';
  
  getProduct(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filters: Array<{key: string; value: string[]}>
  ): Observable<{ results: Product[] }> {

    let params = new HttpParams()
      .append('page', `${pageIndex}`)
      .append('size', `${pageSize}`)
      .append('sortField', `${sortField}`)
      .append('sortOrder', `${sortOrder}`);
    filters.forEach( filter => {
      filter.value.forEach(value => {
        params = params.append(filter.key, value);
      });
    });
    return this.http
      .get<{ results: Product[] }>(`${this.apiUrl}`, { params })
      .pipe(catchError(() => of({ results: [] })));
  }
;
  constructor(private http: HttpClient) { }

}
