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


  total = 1;
  totalItem: Product[] = [];
  datas: Product[] = [];
  loading = true;
  pageSize = 5;
  pageIndex = 1;

  loadDataFromServer(pageIndex: number, pageSize: number): Object {
    this.loading = true;
    this.productService.getProduct(pageIndex, pageSize).subscribe(
      (data) => {
        this.loading = false;
        this.total = this.mountData;
        this.datas = data;
        console.log(this.total);
      })
    return this.datas;
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    console.log(params);
    const { pageSize, pageIndex } = params;
    this.loadDataFromServer(pageIndex, pageSize);
  }

  mountData = 0;
  TotalItem() {
    this.productService.getAll().subscribe((Item: any) => {
      this.totalItem = Item
      this.mountData = this.totalItem.length;
    });
    return this.mountData;

  }

  constructor(private productService: ProductService, private modalService: NzModalService) { }

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize);
    this.TotalItem();
  }

  // delProduct(id: number) {
  //   this.productService.delProduct(id).subscribe(
  //     (data) => { this.datas = data })
  //   window.location.reload();
  // }

  showDelete(id: number): void {
    this.modalService.confirm({
      nzTitle: 'Do you want to delete these item?',
      nzContent: 'Delete?',
      nzOnOk: () => {
        this.productService.delProduct(id).subscribe((data) => { this.datas = data }),
        new Promise((resolve, rejects) => {
          setTimeout(Math.random() > 0.5 ? resolve : rejects, 1000);
        }).catch(() => console.log('Oops errors!'));
        console.log('test');
        window.location.reload();
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
