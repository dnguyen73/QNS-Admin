import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  status: boolean = false;
  constructor() { }

  ngOnInit() {
  }


  //EventEmitter handler for tab selection
  onTabSelected(status: boolean) {
    this.status = status;
  }

}
