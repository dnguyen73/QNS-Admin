import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from "@angular/router";
import { Order } from "../../shared/models/order";
import { Review } from "../../shared/models/review";
import { ReviewService } from "../../shared/services/review.service";

@Component({
  selector: 'review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css']
})
export class ReviewListComponent implements OnInit, OnChanges {
  reviews: Review[] = [];
  @Input() status: boolean;
  constructor(private _router: Router, private reviewSvc: ReviewService) { }

  ngOnInit() {
    this.fetchReviewsByStatus(this.status);//TO-DO: Replace 1 by Group ID
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes['status'].currentValue !== changes['status'].previousValue){
      this.fetchReviewsByStatus(this.status);
    }
  }

  //Get all products belong to given parent id
  fetchAllReviews() {
    this.reviewSvc.getAllReviews()
      .subscribe((reviews) => this.reviews = reviews);
  }

  //Get all products with specific status
  //status: 1(not completed) , 2(completed)
  fetchReviewsByStatus(status: boolean) {
    this.reviewSvc.fetchReviewsByStatus(status)
      .subscribe((reviews) => this.reviews = reviews);
  }

  //View order details
  viewDetail(review: Review){
    this._router.navigate(['reviews/detail', review.id]);
  }

}
