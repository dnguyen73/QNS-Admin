import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from "primeng/primeng";
import { Router } from "@angular/router";

@Component({
  selector: 'order-search',
  templateUrl: './order-search.component.html',
  styleUrls: ['./order-search.component.css']
})
export class OrderSearchComponent implements OnInit {

  items: MenuItem[];


  activeIndex: number = 1;

  constructor(public _router: Router) {
  }

  @Output()
  tabSelected = new EventEmitter();

  ngOnInit() {
    this.items = [
      {
        label: 'Not Completed', icon: 'fa-bar-chart', command: (event) => {
          //event.originalEvent: Browser event
          //event.item: menuitem metadata
          this.tabSelected.emit(false);
        }
      },
      {
        label: 'Completed', icon: 'fa-calendar', command: (event) => {
          this.tabSelected.emit(true);
        }
      }
    ];
  }

}
