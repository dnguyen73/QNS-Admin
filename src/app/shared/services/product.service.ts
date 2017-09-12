import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment';

const FILE_URL: string = environment.apiUrl + '/attachments';

@Injectable()
export class ProductService {

  constructor(private _http: Http) { }

  /**
   * Delete product image by given comtainer and filename
   * Note: Http post request will be cold if there is not any subcribe() call
   */
  removeProductImage(container: string, filename: string): any {
    return this._http
      .delete(FILE_URL + "/" + container + "/files/" + filename)
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
