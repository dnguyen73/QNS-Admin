import { Component, OnInit } from '@angular/core';
import { ProductService } from "../shared/services/product.service";
import { Product } from "../shared/models/product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  parentId: number = 1;
  constructor(private productSvc: ProductService) { }

  ngOnInit() {
  }

  //EventEmitter handler for tab selection
  onTabSelected(parentId: number) {
    this.parentId = parentId;
  }

  changeHTTPS() {
    this.productSvc.getAllProducts()
      .subscribe((products) => {
        for (let p of products) {
          let str = JSON.stringify(p);
          str = str.replace(new RegExp("https", "g"), 'http');
          let pr: Product = new Product(JSON.parse(str));
          //Call API service to store product item to database
          this.productSvc
            .updateProduct(pr)
            .subscribe(
            (newProduct) => {
              //
            });
        }
      });
  }
}
