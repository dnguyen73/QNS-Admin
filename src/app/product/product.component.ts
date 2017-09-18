import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  parentId: number = 1;
  constructor() { }

  ngOnInit() {
  }

  //EventEmitter handler for tab selection
  onTabSelected(parentId: number) {
    this.parentId = parentId;
  }
}
