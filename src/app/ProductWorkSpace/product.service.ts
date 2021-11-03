import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product.model';

const httpOptions={
  headers:new HttpHeaders({'Content-Type':'Application/json'})
}

const apiUrl = 'https://61829a8e02f60a001775cdd4.mockapi.io/Product'

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor( private httpClient:HttpClient) { }

  getAll():Observable<Product[]>{
    return this.httpClient.get<Product[]>(apiUrl).pipe()
  }
}
