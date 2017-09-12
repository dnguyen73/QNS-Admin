import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
    this.items = [
      {
        label: 'Stats', icon: 'fa-bar-chart', command: (event) => {
          //event.originalEvent: Browser event
          //event.item: menuitem metadata
        }
      },
      {
        label: 'Calendar', icon: 'fa-calendar', items: [
          {
            label: 'New', icon: 'fa-plus', command: (event) => {
              //event.originalEvent: Browser event
              //event.item: menuitem metadata
            }
          }
        ]
      },
      { label: 'Documentation', icon: 'fa-book' },
      { label: 'Support', icon: 'fa-support' }
    ];
  }

  addProduct() {
    this._router.navigate(['products/add']);
  }

}
