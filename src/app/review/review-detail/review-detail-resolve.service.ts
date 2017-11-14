import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { ProductService } from "../../shared/services/product.service";
import { Observable } from "rxjs/Observable";
import { ReviewService } from "../../shared/services/review.service";
import { Review } from "../../shared/models/review";

@Injectable()
export class ReviewDetailResolve implements Resolve<Review> {

  constructor(private reviewSvc: ReviewService, private router: Router) { }
    
    resolve(route: ActivatedRouteSnapshot): Observable<Review> {
        let id = route.params['id'];
        return this.reviewSvc.findReviewById(id);
    }

}
