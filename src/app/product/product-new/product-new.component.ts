import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FileObject } from "../../shared/models/fileobject";
import { Stock } from "../../shared/models/stock";
import { environment } from './../../../environments/environment';
import { ConfirmationService } from "primeng/primeng";
import { Message } from 'primeng/components/common/api';
import { ProductService } from "../../shared/services/product.service";
import { Size } from "../../shared/models/size";
import { Product } from "../../shared/models/product";
import { SelectColor } from "../../shared/models/selectColor";
import { CategoryService } from "../../shared/services/category.service";
import { Category } from "../../shared/models/category";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductNewComponent implements OnInit {

  @ViewChild('pUpload') uploadChild;
  @ViewChild('pSize') sizeChild;

  today: number = Date.now();
  newProduct: Product = new Product();
  categories = [];
  colorFiles = [];
  selectedSizes = [];
  stocks: Stock[] = [];
  totalQuantity: number = 0;
  msgs: Message[] = [];

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private productSvc: ProductService,
    private categorySvc: CategoryService,
    private confirmationSvc: ConfirmationService) { }

  ngOnInit() {
    this.initProduct();
  }

  //Initialize product data
  initProduct() {
    let emptyStock: Stock = new Stock({
      filename: '',
      description: '',
      size: '',
      quantity: 0
    });

    this.stocks = [];
    this.stocks = this.stocks.concat(emptyStock);
    this.newProduct.productCode = this.productSvc.generateUid();
    this.newProduct.parentId = +this.route.snapshot.params['id'];
    this.newProduct.createdDate = new Date(this.today);
    this.newProduct.totalQuantity = 0;
    this.categorySvc.getCategoriesById(this.newProduct.parentId)
      .subscribe((categories) => {
        this.categories = categories.map((c) => {
          return {
            "label": c.name,
            "value": c.id
          }
        })
      });
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

  //Event handler to add another stock row
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
      if (s.description !== '' && s.size !== '') {
        this.newProduct.totalQuantity += s.quantity;
      }
    }
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
        this.showSuccess();
        this.reset();
      }
      );

  }

  //Remove stock event handler
  removeStock(index: number) {
    this.confirmationSvc.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.stocks = this.stocks.filter((val, i) => i != index);
        this.sumQuantity();
      },
      reject: () => { }
    });
  }

  //Cancel handler to go back to product list
  cancel() {
    this._router.navigate(['/products']);
  }

  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'New Product created!' });
  }

  //Reset child components and component itself.
  reset() {
    this.uploadChild.reset();
    this.sizeChild.reset();
    this.colorFiles = [];
    this.selectedSizes = [];

    this.newProduct = new Product();
    this.initProduct();
  }
}
