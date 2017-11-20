import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProductService } from "../../shared/services/product.service";
import { Size } from "../../shared/models/size";

@Component({
  selector: 'product-size',
  templateUrl: './product-size.component.html',
  styleUrls: ['./product-size.component.css']
})
export class ProductSizeComponent implements OnInit {

  public sizes: Size[] = [];
  public kidSizes: Size[] = [];
  public adultSizes: Size[] = [];
  private selectedSizes: Size[] = [];
  constructor(private productSvc: ProductService) { }

@Input() availableSizes: string[] = [];
@Output() sizeSelected = new EventEmitter();
  
  ngOnInit() {
    this.fetchAllSizes();
  }

  fetchAllSizes() {
    this.productSvc.getAllProductSizes()
      .subscribe((sizes) => {
        this.sizes = sizes;
        this.sizes.map((size) => {
          if (this.availableSizes.indexOf(size.label) > -1){
            size.selected = true;
            this.selectedSizes.push(size);
          }
        });
        this.kidSizes = this.sizes.filter((s) => s.code === "KC");
        this.adultSizes = this.sizes.filter((s) => s.code === "AC");
        
        //emit selected sizes
        this.sizeSelected.emit(this.selectedSizes);
        
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

  //reset component
  reset(){
    this.selectedSizes = [];
    this.kidSizes.map((s) => {
      s.selected = false;
    });
    this.adultSizes.map((s) => {
      s.selected = false;
    });
  }

}
