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
  total= 1;
  datas:Product[]= [];
  loading = true;
  pageSize= 5;
  pageIndex= 1;
  filterGender = [
    
  ]; 

  loadDataFromServer(
    pageIndex: number,
    pageSize: number,
    sortField: string | null,
    sortOrder: string | null,
    filter: Array<{ key: string; value: string[] }>
  ):void{
    this.loading= true;
    this.productService.getProduct(pageIndex, pageSize, sortField, sortOrder, filter).subscribe(data => {
      this.loading= false;
      this.total = 200;
      this.datas= data.results;
    })
  }

  onQueryParamsChange(params: NzTableQueryParams):void{
    console.log(params);
    const {pageSize, pageIndex, sort, filter} = params;
    const currentSort = sort.find(item => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.loadDataFromServer(pageIndex, pageSize, sortField, sortOrder, filter);
  }

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadDataFromServer( this.pageIndex, this.pageSize, null, null, []);
  }


}
