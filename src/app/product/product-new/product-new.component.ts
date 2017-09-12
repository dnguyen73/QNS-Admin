import { Component, OnInit } from '@angular/core';
import { FileObject } from "../../shared/models/fileobject";
import { environment } from './../../../environments/environment';
import { ConfirmationService } from "primeng/primeng";
import { ProductService } from "../../shared/services/product.service";

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  constructor(private productSvc: ProductService, private confirmationSvc: ConfirmationService) { }

  public count: number = 1;
  public test = {
    a: 1,
    b: 2
  }


  ngOnInit() {
  }

  updateCount() {
    this.count++;
  }

  

}
