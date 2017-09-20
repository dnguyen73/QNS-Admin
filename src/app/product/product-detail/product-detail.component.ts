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
import { DropdownItem } from "../../shared/models/dropdownItem";

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDetailComponent implements OnInit {

  @ViewChild('pUpload') uploadChild;
  @ViewChild('pSize') sizeChild;
  @ViewChild('pStock') stockChild;

  today: number = Date.now();
  myProduct: Product = new Product();
  categories = [];
  colorFiles: DropdownItem[] = [];
  selectedSizes: DropdownItem[] = [];
  stocks: Stock[] = [];
  msgs: Message[] = [];
  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private productSvc: ProductService,
    private categorySvc: CategoryService
  ) { }

  ngOnInit() {
    let code = this.route.snapshot.params['code'];
    this.route.data
      .subscribe((data: { product: Product }) => {
        this.myProduct = data.product;

        this.categorySvc.getCategoriesById(this.myProduct.parentId)
          .subscribe((categories) => {
            this.categories = categories.map((c) => {
              return {
                "label": c.name,
                "value": c.id
              }
            })
          });
      });
  }

  //EventEmitter handler from product-upload
  onFileSelected(uploadedFiles: FileObject[]) {
    this.myProduct.images = uploadedFiles;
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

  //Submit button to update product
  submit() {
    //assign available sizes
    this.myProduct.availableSizes = this.selectedSizes.map((s) => {
      return s.label;
    })
    //assign available file images ==> for end user product page
    this.myProduct.availableColors = this.colorFiles.map((f) => {
      return new SelectColor({
        parentId: this.myProduct.parentId,
        filename: f.value,
        description: f.label
      });
    })
    //assign stocks array list from product-stock component
    this.myProduct.stocks = this.stockChild.stocks;
    this.myProduct.totalQuantity = this.stockChild.totalQuantity;

    //Call API service to store product item to database
    this.productSvc
      .updateProduct(this.myProduct)
      .subscribe(
      (newProduct) => {
        //this.categories = this.categories.concat(newCategory);
        //this.fetchCategories(this.group.id);
        this.showSuccess();
        //this.reset();
      }
      );
  }

  //Cancel handler to go back to product list
  cancel() {
    this._router.navigate(['/products']);
  }

  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Product updated successfully!' });
  }

}
