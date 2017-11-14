import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Category } from './../models/category';
import { environment } from './../../../environments/environment';
import { HttpClient } from "./http-client.service";

const CATEGORY_URL: string = environment.apiUrl + '/categories';

@Injectable()
export class CategoryService {

  constructor(private _http: HttpClient) { }

  /**
   * Grab all category items from loopback api
   */
  getAllCategories(): Observable<Category[]> {
    return this._http
      .get(CATEGORY_URL)
      .map(res => {
        const categories = res.json();
        return categories.map((category) => new Category(category));
      })
      .catch(this.handleError);
  }

  /**
   * Grab group of category items for given parentId from loopback api
   */
  getCategoriesById(pId: number): Observable<Category[]> {
    return this._http
      .get(CATEGORY_URL)
      .map(res => {
        const categories = res.json();
        return categories
          .filter(c => c.parentId === pId)
          .map((category) => new Category(category));
      })
      .catch(this.handleError);
  }

  /**
   * Add new category
   * Note: Http post request will be cold if there is not any subcribe() call
   */
  addCategory(category: Category): Observable<Category> {
    return this._http
      .post(CATEGORY_URL, category)
      .map((res) =>
      { 
        return new Category(res.json());
      })
      .catch(this.handleError);
  }

  /**
   * Add new category
   * Note: Http post request will be cold if there is not any subcribe() call
   */
  removeCategory(categoryId: string): Observable<Category> {
    return this._http
      .delete(CATEGORY_URL + "/" + categoryId)
      .map((res) => null)
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
