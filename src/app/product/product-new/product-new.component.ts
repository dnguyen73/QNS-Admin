import { Component, OnInit } from '@angular/core';
import { FileObject } from "../../shared/models/fileobject";
import { Stock } from "../../shared/models/stock";
import { environment } from './../../../environments/environment';
import { ConfirmationService } from "primeng/primeng";
import { ProductService } from "../../shared/services/product.service";

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css']
})
export class ProductNewComponent implements OnInit {

  selectedFiles = [];
  stocks: Stock[] = [];

  constructor(private productSvc: ProductService, private confirmationSvc: ConfirmationService) { }

  ngOnInit() {
    let emptyStock: Stock = new Stock({
      filename: '',
      description: '',
      size: '',
      quantity: 0
    });
    this.stocks = this.stocks.concat(emptyStock);
  }

  onFileSelected(uploadedFiles: FileObject[]) {
    this.selectedFiles = [];
    for (let i of uploadedFiles) {
      this.selectedFiles = this.selectedFiles.concat({
        label: i.description,
        value: i.description
      });
    }
  }

  onAddStock() {
    let emptyStock: Stock = new Stock({
      filename: '',
      description: '',
      size: '',
      quantity: 0
    });
    this.stocks = this.stocks.concat(emptyStock);
  }

}
