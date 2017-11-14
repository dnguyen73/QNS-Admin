import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { ProductService } from "../../shared/services/product.service";
import { Observable } from "rxjs/Observable";
import { Order } from "../../shared/models/order";
import { OrderService } from "../../shared/services/order.service";

@Injectable()
export class OrderDetailResolve implements Resolve<Order> {

  constructor(private orderSvc: OrderService, private router: Router) { }
    
    resolve(route: ActivatedRouteSnapshot): Observable<Order> {
        let id = route.params['code'];
        return this.orderSvc.findOrderByCode(id);
    }

}
