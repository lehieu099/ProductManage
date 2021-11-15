import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../service/product.service';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { Product } from '../product.model';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService, private modalService: NzModalService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.loadDataFromServer(this.pageIndex, this.pageSize);
    this.TotalItem();
  }

  productForm: FormGroup;
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
          console.log('test');
      }
    });
  }

  isVisible = false;
  isConfirmLoading = false;

  addProductModal() {
    this.isVisible = true;
    this.productForm = this.fb.group({
      productName: ['', [Validators.required]],
      type: ['', [Validators.required]],
      date: ['', [Validators.required]],
      price: ['', [Validators.required]]
    });
  }

  showEdit(ID: number) {
    console.log(ID);
    for (const i in this.datas) {
      if (this.datas[i].id == ID) {
        this.productForm = this.fb.group({
          productName: [this.datas[i].name],
          type: [this.datas[i].type],
          date: [this.datas[i].date],
          price: [this.datas[i].price]
        });
        debugger;
      }
    }
    this.isVisible = true;
  };

  handleOk(): void {
    // this.isConfirmLoading = true;
    for (const i in this.productForm.controls) {
      if (this.productForm.controls.hasOwnProperty(i)) {
        this.productForm.controls[i].markAsDirty();
        this.productForm.controls[i].updateValueAndValidity();
      }
      console.log("check")
    }

    if (!this.productForm.valid) {
      this.isVisible = true;
    }
    else {
      this.isVisible = false;
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}