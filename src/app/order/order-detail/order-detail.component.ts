import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { OrderService } from "../../shared/services/order.service";
import { Order } from "../../shared/models/order";
import { CartItem } from "../../shared/models/cartitem";
import { environment } from "../../../environments/environment";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OrderDetailComponent implements OnInit {
  myOrder: Order = new Order();
  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private orderSvc: OrderService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    let code = this.route.snapshot.params['code'];
    this.route.data
      .subscribe((data: { order: Order }) => {
        this.myOrder = data.order;
      });
  }

  public numOfItems() {
    let count = this.myOrder.items.length;
    return count + " item" + ((count > 1) ? "s" : "");
  }

  public getImagePath(item: CartItem) {
    return environment.FILE_HOST_URL + "/" + item.product.parentId + "/thumb/" + item.colorPath;
  }

  public itemSubTotal(item: CartItem) {
    return item.quantity * item.product.price;
  }

  //avoid adding prefix “unsafe:” to links
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  //Cancel handler to go back to product list
  cancel() {
    this._router.navigate(['/orders']);
  }

  complete() {
    //this._router.navigate(['/orders']);
    this.orderSvc.changeOrderStatus(this.myOrder.orderCode, true)
      .subscribe((_) => {
        alert('Order status changed successfully');
        this.myOrder.paymentStatus = true;
      });
  }

  updateQty(item: CartItem){
    //console.log(this.myOrder.items[0].quantity);
    this.myOrder.orderAmount = this.myOrder.items.reduce((prev, curr: CartItem) => {
        return prev + (curr.unitPrice * curr.quantity);
      }, 0);
  }

}
