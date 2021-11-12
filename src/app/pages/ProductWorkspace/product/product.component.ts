import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Product } from '../product.model';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService, private modalService: NzModalService) { }

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize);
    this.TotalItem();
  }

  total: number;
  totalItem: Product[] = [];
  datas: Product[] = [];
  loading = true;
  pageSize = 4;
  pageIndex = 1;
  pageCurrent: number;

  loadDataFromServer(pageIndex: number, pageSize: number): Object {
    this.loading = false;
    this.productService.getProduct(pageIndex, pageSize).subscribe(
      (data) => {
        this.total = this.mountData;
        this.datas = data;
        console.log(this.total);
      })
    return this.datas;
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    console.log(params);
    const { pageSize, pageIndex } = params;
    this.loadDataFromServer(pageIndex, pageSize);
    return this.pageCurrent = pageIndex;
  }

  mountData = 0;
  TotalItem() {
    this.productService.getAll().subscribe((Item: any) => {
      this.totalItem = Item
      this.mountData = this.totalItem.length;
    });
    return this.mountData;

  }

  delete(id: number) {
    this.productService.delProduct(id).subscribe((data) => { this.datas = data });
    this.TotalItem();
    this.loadDataFromServer(this.pageCurrent, this.pageSize);
  }

  showDelete(id: number): void {
    this.modalService.confirm({

      nzTitle: 'Do you want to delete these item?',
      nzContent: 'Delete?',
      nzOnOk: () => {
        this.delete(id),
          new Promise((resolve, rejects) => {
            setTimeout(Math.random() > 0.5 ? resolve : rejects, 1000);
          }).catch(() => console.log('Oops errors!'));
        console.log('test');
      }
    });

  }

  isVisible = false;
  isConfirmLoading = false;

  editProduct(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isConfirmLoading = true;
    setTimeout(() => {
      this.isVisible = false;
      this.isConfirmLoading = false;
    }, 1000);
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
