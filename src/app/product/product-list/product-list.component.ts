import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductService } from "../../shared/services/product.service";
import { Product } from "../../shared/models/product";
import { Router } from "@angular/router";

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnChanges {
  products: Product[] = [];
  @Input() parentId: number;
  constructor(private _router: Router, private productSvc: ProductService) { }

  ngOnInit() {
    this.fetchProducts(this.parentId);//TO-DO: Replace 1 by Group ID
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes['parentId'].currentValue !== changes['parentId'].previousValue){
      this.fetchProducts(this.parentId);
    }
  }

  //Get all products belong to given parent id
  fetchProducts(parentId: number) {
    this.productSvc.getProductsByParentId(parentId)
      .subscribe((products) => this.products = products);
  }

  addNewProduct() {
    this._router.navigate(['products/add', this.parentId]);
  }

  viewDetail(product: Product){
    this._router.navigate(['products/detail', product.productCode]);
  }

  delete(product: Product){
    this.productSvc.deleteProduct(product)
      .subscribe(res => {
        if (res.count){
          alert('Xóa sản phẩm thành công');
          this.fetchProducts(this.parentId);
        } else {
          alert('Xóa sản phẩm thất bại');
        }
      })
  }
}
