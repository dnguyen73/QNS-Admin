import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FileObject } from "../../shared/models/fileobject";
import { Stock } from "../../shared/models/stock";
import { environment } from './../../../environments/environment';
import { ConfirmationService } from "primeng/primeng";
import { ProductService } from "../../shared/services/product.service";
import { Size } from "../../shared/models/size";
import { Product } from "../../shared/models/product";
import { SelectColor } from "../../shared/models/selectColor";

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductNewComponent implements OnInit {

  today: number = Date.now();
  newProduct: Product = new Product();
  colorFiles = [];
  selectedSizes = [];
  stocks: Stock[] = [];
  totalQuantity: number = 0;

  constructor(private productSvc: ProductService, private confirmationSvc: ConfirmationService) { }

  ngOnInit() {
    let emptyStock: Stock = new Stock({
      filename: '',
      description: '',
      size: '',
      quantity: 0
    });
    this.stocks = this.stocks.concat(emptyStock);
    this.newProduct.productCode = this.productSvc.generateUid();
    this.newProduct.parentId = 1; //To-do: should be dynamic category id
    this.newProduct.createdDate = new Date(this.today);
    this.newProduct.totalQuantity = 0;
  }

  //EventEmitter handler from product-upload
  onFileSelected(uploadedFiles: FileObject[]) {
    this.newProduct.images = uploadedFiles;
    this.colorFiles = [];

    for (let i of uploadedFiles) {
      if (i.isColor && i.description !== '') {
        this.colorFiles = this.colorFiles.concat({
          label: i.description,
          value: i.filename
        });
      }
    }
  }

  //EventEmitter handler from product-size component
  onSizeSelected(sizes: Size[]) {
    this.selectedSizes = [];
    for (let i of sizes) {
      this.selectedSizes = this.selectedSizes.concat({
        label: i.label,
        value: i.label
      });
    }
  }

  //Event handler when color changed on each stock row
  onColorSelected(e: any, row: Stock) {
    let val = e.value;
    let idx = this.colorFiles.map(function (f) {
      return f.value;
    }).indexOf(val);
    row.description = this.colorFiles[idx].label;
    row.filename = val;
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

  //Calculate total quantity once quantity of sub item has changed.
  sumQuantity(): void {
    this.newProduct.totalQuantity = 0;
    for (let s of this.stocks) {
      this.newProduct.totalQuantity += s.quantity;
    }
    //return this.newProduct.totalQuantity;
  }

  //Submit button to create new product
  submit() {
    //assign available sizes
    this.newProduct.availableSizes = this.selectedSizes.map((s) => {
      return s.label;
    })
    //assign available file images
    this.newProduct.availableColors = this.colorFiles.map((f) => {
      return new SelectColor({
        parentId: this.newProduct.parentId,
        filename: f.value,
        description: f.label
      });
    })
    //assign stocks array list
    this.newProduct.stocks = this.stocks;

    //Call API service to store product item to database
    this.productSvc
      .addProduct(this.newProduct)
      .subscribe(
      (newProduct) => {
        //this.categories = this.categories.concat(newCategory);
        //this.fetchCategories(this.group.id);
        alert('Add product successfully');
      }
      )
    this.newProduct = new Product();
  }
}
