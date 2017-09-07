import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Category } from './../models/category';
import { environment } from './../../../environments/environment';

const CATEGORY_URL: string = environment.apiUrl + '/categories';

@Injectable()
export class CategoryService {

  constructor(private http: Http) { }

  /**
   * Grab all category items from loopback api
   */
  getAllCategories(): Observable<Category[]> {
    return this.http
      .get(CATEGORY_URL)
      .map(res => {
        const categories = res.json();
        return categories.map((category) => new Category(category));
      })
      .catch(this.handleError);
  }

  /**
   * Add new category
   */
  addCategory(category: Category): Observable<Category> {
    return this.http
      .post(CATEGORY_URL, category)
      .map((res) =>
      { 
        return new Category(res.json());
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
