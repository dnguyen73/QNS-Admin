import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ProductService } from "../../shared/services/product.service";
import { Size } from "../../shared/models/size";

@Component({
  selector: 'product-size',
  templateUrl: './product-size.component.html',
  styleUrls: ['./product-size.component.css']
})
export class ProductSizeComponent implements OnInit {

  private sizes: Size[] = [];
  private kidSizes: Size[] = [];
  private adultSizes: Size[] = [];
  private selectedSizes: Size[] = [];
  constructor(private productSvc: ProductService) { }

@Output()
  sizeSelected = new EventEmitter();
  
  ngOnInit() {
    this.fetchAllSizes();
  }

  fetchAllSizes() {
    this.productSvc.getAllProductSizes()
      .subscribe((sizes) => {
        this.sizes = sizes;
        this.kidSizes = this.sizes.filter((s) => s.code === "KC");
        this.adultSizes = this.sizes.filter((s) => s.code === "AC");
      });
  }

  displayOnInit(action: string, selected?: string[]) {

  }

  toggleSelect(item: Size) {
    if (!item.selected) {
      item.selected = !item.selected;
      this.selectedSizes.push(item);
    } else {
      item.selected = !item.selected;
      let index = this.selectedSizes.map(function (s) {
        return s.label;
      }).indexOf(item.label);
      this.selectedSizes = this.selectedSizes.filter((val, i) => i != index);
    }

    //emit selected sizes
    this.sizeSelected.emit(this.selectedSizes);
  }

}
