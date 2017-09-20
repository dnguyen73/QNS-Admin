import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Product } from "../../shared/models/product";
import { ProductService } from "../../shared/services/product.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ProductDetailResolve implements Resolve<Product> {

  constructor(private productService: ProductService, private router: Router) { }
    
    resolve(route: ActivatedRouteSnapshot): Observable<Product> {
        let id = route.params['code'];
        return this.productService.findProductByCode(id);
    }

}
