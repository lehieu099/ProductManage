import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Product } from '../product.model';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private apiUrl = 'https://61829a8e02f60a001775cdd4.mockapi.io/Product';
  total = 1;
  datas: Product[]= [];
  loading = true;
  pageSize = 5;
  pageIndex = 1;

  loadDataFromServer(pageIndex: number, pageSize: number): Object {
    this.loading = true;
    this.productService.getProduct(pageIndex, pageSize).subscribe(
      (data) => {
        this.loading = false;
        this.total = 25;
        this.datas = data;
      })
      return this.datas;
  }
  


  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex } = params;
    this.loadDataFromServer(pageIndex, pageSize);
  }

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize);
  }

  delProduct(id:number){
    this.productService.delProduct(id).subscribe(
      (data)=>
      {this.datas=data})
    alert('Product deleted')
    window.location.reload();
  }

  editProduct(){
    
  }
}
