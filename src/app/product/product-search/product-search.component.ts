import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from "primeng/primeng";
import { Router } from "@angular/router";

@Component({
  selector: 'product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  items: MenuItem[];


  activeIndex: number = 1;

  constructor(public _router: Router) {
  }

  @Output()
  tabSelected = new EventEmitter();

  ngOnInit() {
    this.items = [
      {
        label: 'Thoi trang Nu', icon: 'fa-bar-chart', command: (event) => {
          //event.originalEvent: Browser event
          //event.item: menuitem metadata
          this.tabSelected.emit(1);
        }
      },
      {
        label: 'Thoi trang Trung nien', icon: 'fa-calendar', command: (event) => {
          this.tabSelected.emit(2);
        }
      },
      {
        label: 'Thoi trang be trai', icon: 'fa-book', command: (event) => {
          this.tabSelected.emit(3);
        }
      },
      {
        label: 'Thoi trang be gai', icon: 'fa-support', command: (event) => {
          this.tabSelected.emit(4);
        }
      }
    ];
  }

  searchProduct() {
    this._router.navigate(['products/add']);
  }

}
