import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { environment } from "../../../environments/environment";
import { HttpClient } from "./http-client.service";
import { Review } from "../models/review";

const REVIEW_URL: string = environment.apiUrl + '/reviews';

@Injectable()
export class ReviewService {

  constructor(private _http: HttpClient) { }

  /**
     * Grab all review items from loopback api
     */
  getAllReviews(): Observable<Review[]> {
    return this._http
      .get(REVIEW_URL)
      .map(res => {
        const review = res.json();
        return review.map((r) => new Review(r));
      })
      .catch(this.handleError);
  }

  /**
   * Grab all review items for given status from loopback api
   */
  fetchReviewsByStatus(status: boolean): Observable<Review[]> {
    return this._http
      .get(REVIEW_URL)
      .map(res => {
        const reviews = res.json();
        return reviews
          .filter(r => r.status === status)
          .map((review) => new Review(review));
      })
      .catch(this.handleError);
  }

  /**
   * Get one review by ID from loopback api
   */
  findReviewById(id: string): Observable<Review> {
    return this._http
      .get(REVIEW_URL + "/" + id)
      .map(res => {
        const review = res.json();
        return new Review(review);
      })
      .catch(this.handleError);
  }

  /**
   * Set review status from loopback api
   */
  changeReviewStatus(reviewId: string, newStatus: boolean): Observable<Review> {
    return this._http
      .post(REVIEW_URL + "/changeStatus", { reviewId: reviewId, status: newStatus })
      .map(res => {
        const review = res.json();
        return new Review(review);
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
