import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../product.model';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  datas:Product[]= [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.productService.getAll().subscribe((res:any)=>{
      this.datas=res;
    })
  }

}
