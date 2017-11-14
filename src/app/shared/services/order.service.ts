import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Order } from "../models/order";
import { environment } from "../../../environments/environment";
import { HttpClient } from "./http-client.service";

const ORDER_URL: string = environment.apiUrl + '/orders';

@Injectable()
export class OrderService {

  constructor(private _http: HttpClient) { }

  /**
     * Grab all order items from loopback api
     */
  getAllOrders(): Observable<Order[]> {
    return this._http
      .get(ORDER_URL)
      .map(res => {
        const order = res.json();
        return order.map((o) => new Order(o));
      })
      .catch(this.handleError);
  }

  /**
   * Grab all order items for given status from loopback api
   */
  fetchOrdersByStatus(status: boolean): Observable<Order[]> {
    return this._http
      .get(ORDER_URL)
      .map(res => {
        const orders = res.json();
        return orders
          .filter(o => o.paymentStatus === status)
          .map((order) => new Order(order));
      })
      .catch(this.handleError);
  }

  /**
   * Get one product for given product code from loopback api
   */
  findOrderByCode(code: string): Observable<Order> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('code', code);

    return this._http
      .getWithParams(ORDER_URL + "/findByCode", params)
      .map(res => {
        const order = res.json();
        return new Order(order);
      })
      .catch(this.handleError);
  }

  /**
   * Get one product for given product code from loopback api
   */
  changeOrderStatus(orderId: string, newStatus: boolean): Observable<Order> {
    return this._http
      .post(ORDER_URL + "/changeStatus", { orderCode: orderId, status: newStatus })
      .map(res => {
        const order = res.json();
        return new Order(order);
      })
      .catch(this.handleError);
  }

  /**
   * Error handling method
   */
  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error);
    return Observable.throw(error);
  }

}
