import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Product } from '../product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  total = 1;
  datas: Product[]= [];
  loading = true;
  pageSize = 3;
  pageIndex = 1;

  loadDataFromServer(pageIndex: number, pageSize: number): void {
    this.loading = true;
    this.productService.getProduct(pageIndex, pageSize).subscribe(
      (data) => {
        this.loading = false;
        this.total = 200;
        console.log(typeof(this.datas));
        console.log(data)
        this.datas = data;
      })
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
}
