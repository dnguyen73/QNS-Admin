import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Stock } from "../../shared/models/stock";
import { DropdownItem } from "../../shared/models/dropdownItem";
import { ConfirmationService } from "primeng/primeng";

@Component({
  selector: 'product-stock',
  templateUrl: './product-stock.component.html',
  styleUrls: ['./product-stock.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ProductStockComponent implements OnInit {

  constructor(private confirmationSvc: ConfirmationService) { }
  stocks: Stock[] = [];
  totalQuantity: number = 0;

  @Input()
  colorFiles: DropdownItem[];

  @Input()
  selectedSizes: DropdownItem[];

  ngOnInit() {
    this.initStock();
  }

  initStock(){
    let emptyStock: Stock = new Stock({
      filename: '',
      description: '',
      size: '',
      quantity: 0
    });

    this.stocks = [];
    this.stocks = this.stocks.concat(emptyStock);
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

  //Calculate total quantity once quantity of sub item has changed.
  sumQuantity(): void {
    this.totalQuantity = 0;
    for (let s of this.stocks) {
      if (s.description !== '' && s.size !== '') {
        this.totalQuantity += s.quantity;
      }
    }
  }

  //Reset the component
  reset(){
    this.initStock();
    this.colorFiles = [];
    this.selectedSizes = [];
    this.totalQuantity = 0;
  }
}
