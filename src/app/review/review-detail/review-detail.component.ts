import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ReviewService } from "../../shared/services/review.service";
import { Review } from "../../shared/models/review";

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.css']
})
export class ReviewDetailComponent implements OnInit {
  myReview: Review = new Review();
  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private reviewSvc: ReviewService
  ) { }

  ngOnInit() {
    let id = this.route.snapshot.params['id'];
    this.route.data
      .subscribe((data: { review: Review }) => {
        this.myReview = data.review;
      });
  }

  //Cancel handler to go back to product list
  cancel() {
    this._router.navigate(['/reviews']);
  }

  complete() {
    //this._router.navigate(['/orders']);
    this.reviewSvc.changeReviewStatus(this.myReview.id, this.myReview.status)
      .subscribe((_) => {
        alert('Review status changed successfully');
        this._router.navigate(['/reviews']);
      });
  }

}
