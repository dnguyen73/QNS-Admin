import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../../environments/environment';
import { FileObject } from "../models/fileobject";
import { Size } from "../models/size";
import { Product } from "../models/product";
import { HttpClient } from "./http-client.service";

const FILE_URL: string = environment.apiUrl + '/attachments';
const SIZE_URL: string = environment.apiUrl + '/sizes';
const PRODUCT_URL: string = environment.apiUrl + '/products';

@Injectable()
export class ProductService {

  constructor(private _http: HttpClient, private _httpOrigin: Http) { }

  /**
     * Generate product code randomly by A..Z0..9
     * This will be generated for only new product
     */
  generateUid(): string {
    let _uid = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    for (var i = 0; i < 6; i++)
      _uid += possible.charAt(Math.floor(Math.random() * possible.length));

    return _uid;
  }

  /**
   * Delete product image by given container and filename
   * Note: Http post request will be cold if there is not any subcribe() call
   */
  removeProductImage(container: string, filename: string): any {
    return this._http
      .delete(FILE_URL + "/" + container + "/files/" + filename)
      .map((res) => null)
      .catch(this.handleError);
  }

  /**
   * Upload product image to given container
   * Note: Http post request will be cold if there is not any subcribe() call
   */
  uploadProductImage(container: string, file: any): Observable<any> {
    let formData = new FormData();
    let tobeUploaded = false;
    //Don't upload image file which is not existing on cloud storage
    if (file.filepath.indexOf('blob:') > -1) {
      formData.append('file', file);
      tobeUploaded = true;
    }

    if (tobeUploaded) {
      return this._http
        .postFormData(FILE_URL + "/" + container + "/upload", formData)
        .map((res) => {
          console.log(JSON.stringify(res));
          return res.json().result.files.file[0];
        })
        .catch(this.handleError);
    }
    else {
      return Observable.of<any[]>([]);
    }

  }

  /**
   * Upload list of product images to given container
   * Note: Http post request will be cold if there is not any subcribe() call
   */
  uploadProductImages(container: string, files: FileObject[]): Observable<any[]> {
    let formData = new FormData();
    let tobeUploaded = false;
    for (let item of files) {
      //Don't upload image file which is not existing on cloud storage
      if (item.filepath.indexOf('blob:') > -1) {
        formData.append('file', item.file);
        tobeUploaded = true;
      }
    }

    if (tobeUploaded) {
      return this._http
        .postFormData(FILE_URL + "/" + container + "/upload", formData)
        .map((res) => {
          console.log(JSON.stringify(res));
          return res.json().result.files.file;
        })
        .catch(this.handleError);
    } else {
      return Observable.of<any[]>([]);
    }

  }

  /**
   * Upload product image to given comtainer
   * Note: Http post request will be cold if there is not any subcribe() call
   */
  getAllProductSizes(): Observable<Size[]> {
    return this._http
      .get(SIZE_URL)
      .map(res => {
        const sizes = res.json();
        return sizes.map((category) => new Size(category));
      })
      .catch(this.handleError);
  }

  /**
     * Grab all product items from loopback api
     */
  getAllProducts(): Observable<Product[]> {
    return this._http
      .get(PRODUCT_URL)
      .map(res => {
        const product = res.json();
        return product.map((product) => new Product(product));
      })
      .catch(this.handleError);
  }

  /**
   * Grab all product items for given parentId from loopback api
   */
  getProductsByParentId(pId: number): Observable<Product[]> {
    return this._http
      .get(PRODUCT_URL)
      .map(res => {
        const products = res.json();
        return products
          .filter(p => p.parentId === pId)
          .map((product) => new Product(product));
      })
      .catch(this.handleError);
  }

  /**
   * Get one product for given product code from loopback api
   */
  findProductByCode(code: string): Observable<Product> {
    let params: URLSearchParams = new URLSearchParams();
    params.set('code', code);

    return this._http
      .getWithParams(PRODUCT_URL + "/findByCode", params)
      .map(res => {
        const product = res.json();
        return new Product(product);
      })
      .catch(this.handleError);
  }

  /**
   * Add new product
   * Note: Http post request will be cold if there is not any subcribe() call
   */
  addProduct(product: Product): Observable<Product> {
    return this._http
      .post(PRODUCT_URL, product)
      .map((res) => {
        return new Product(res.json());
      })
      .catch(this.handleError);
  }

  /**
   * Update existing product by a new one -> update product properties
   * Note: Http post request will be cold if there is not any subcribe() call
   */
  updateProduct(product: Product): Observable<Product> {
    return this._http
      .put(PRODUCT_URL + "/" + product.id, product)
      .map((res) => {
        return new Product(res.json());
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
