import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  status: boolean = false;
  constructor() { }

  ngOnInit() {
  }


  //EventEmitter handler for tab selection
  onTabSelected(status: boolean) {
    this.status = status;
  }

}
