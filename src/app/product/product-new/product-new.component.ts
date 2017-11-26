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
  selector: 'app-product-new',
  templateUrl: './product-new.component.html',
  styleUrls: ['./product-new.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductNewComponent implements OnInit {

  @ViewChild('pUpload') uploadChild;
  @ViewChild('pSize') sizeChild;
  @ViewChild('pStock') stockChild;

  today: number = Date.now();
  newProduct: Product = new Product();
  categories = [];
  colorFiles: DropdownItem[] = [];
  selectedSizes: DropdownItem[] = [];
  msgs: Message[] = [];
  selectedValue: string;

  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private productSvc: ProductService,
    private categorySvc: CategoryService
  ) { }

  ngOnInit() {
    this.initProduct();
  }

  //Initialize product data
  initProduct() {

    this.newProduct.productCode = this.productSvc.generateUid();
    this.newProduct.parentId = +this.route.snapshot.params['id'];
    this.newProduct.createdDate = new Date(this.today);
    this.newProduct.totalQuantity = 0;
    this.categorySvc.getCategoriesById(this.newProduct.parentId)
      .subscribe((categories) => {
        this.categories = categories.map((c) => {
          return {
            "label": (c.label)? c.name + " (" + c.label + ")" : c.name,
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
    setTimeout(() => {
      this.stockChild.updateStock();
    });
  }

  //EventEmitter handler from product-size component
  onSizeSelected(sizes: string[]) {
    this.selectedSizes = [];
    for (let i of sizes) {
      this.selectedSizes = this.selectedSizes.concat({
        label: i,
        value: i
      });
    }
    setTimeout(() => {
      this.stockChild.updateStock();
    });
  }

  //Calculate discount percent based on new price
  getDiscountPercent(newPrice: number){
    let p = Math.round((newPrice / this.newProduct.price) * 100);
    this.newProduct.discountPercent = p;
    return p;
  }

  //Calculate discount percent based on new price
  getDiscountPrice(percentage: number){
    let p = Math.round((this.newProduct.price*percentage) / 100);
    this.newProduct.discountPrice = p;
    return p;
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
    //assign stocks array list from product-stock component
    this.newProduct.stocks = this.stockChild.stocks;
    this.newProduct.totalQuantity = this.stockChild.totalQuantity;

    //Call API to upload selected files
    this.productSvc
      .uploadProductImages(this.newProduct.parentId.toString(), this.newProduct.images)
      .subscribe((result) => {
        for (let i in result) {
          this.newProduct.images[i].thumbnail = environment.FILE_HOST_URL + "/" + result[i].container + "/thumb/" + result[i].name;
          this.newProduct.images[i].filepath = environment.FILE_HOST_URL + "/" + result[i].container + "/" + result[i].name;
        }

        //Call API service to store product item to database
        this.productSvc
          .addProduct(this.newProduct)
          .subscribe(
          (newProduct) => {
            this.showSuccess();
            this.reset();
            alert('Thêm sản phẩm thành công');
            this._router.navigate(['/products']);
          }
          );
      });


  }// End of Submit func

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
    this.stockChild.reset();

    this.newProduct = new Product();
    this.initProduct();
  }
}
