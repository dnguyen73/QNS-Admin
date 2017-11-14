import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MenuItem } from "primeng/primeng";
import { Router } from "@angular/router";

@Component({
  selector: 'review-search',
  templateUrl: './review-search.component.html',
  styleUrls: ['./review-search.component.css']
})
export class ReviewSearchComponent implements OnInit {

  items: MenuItem[];


  activeIndex: number = 1;

  constructor(public _router: Router) {
  }

  @Output()
  tabSelected = new EventEmitter();

  ngOnInit() {
    this.items = [
      {
        label: 'Pending', icon: 'fa-bar-chart', command: (event) => {
          //event.originalEvent: Browser event
          //event.item: menuitem metadata
          this.tabSelected.emit(false);
        }
      },
      {
        label: 'Approved', icon: 'fa-calendar', command: (event) => {
          this.tabSelected.emit(true);
        }
      }
    ];
  }

}
