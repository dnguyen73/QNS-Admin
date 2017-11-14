import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from "@angular/router";
import { Order } from "../../shared/models/order";
import { OrderService } from "../../shared/services/order.service";

@Component({
  selector: 'order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit, OnChanges {
  orders: Order[] = [];
  @Input() status: boolean;
  constructor(private _router: Router, private orderSvc: OrderService) { }

  ngOnInit() {
    this.fetchOrdersByStatus(this.status);//TO-DO: Replace 1 by Group ID
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes['status'].currentValue !== changes['status'].previousValue){
      this.fetchOrdersByStatus(this.status);
    }
  }

  //Get all products belong to given parent id
  fetchAllOrders() {
    this.orderSvc.getAllOrders()
      .subscribe((orders) => this.orders = orders);
  }

  //Get all products with specific status
  //status: 1(not completed) , 2(completed)
  fetchOrdersByStatus(status: boolean) {
    this.orderSvc.fetchOrdersByStatus(status)
      .subscribe((orders) => this.orders = orders);
  }

  //View order details
  viewDetail(order: Order){
    this._router.navigate(['orders/detail', order.orderCode]);
  }

}
