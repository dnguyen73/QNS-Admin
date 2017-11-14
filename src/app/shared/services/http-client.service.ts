import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class HttpClient {

  constructor(private http: Http) {}

  createAuthorizationHeader(headers: Headers) {
    headers.append('access_token', localStorage.getItem("token"));
    headers.append('Content-Type', "application/json");
  }

  createAuthorizationHeaderWithNoContentType(headers: Headers) {
    headers.append('access_token', localStorage.getItem("token"));
    //headers.append('Content-Type', "multipart/form-data");
  }

  get(url:string) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.get(url,{
      headers: headers
    });
  }

  getWithParams(url:string, data: any) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    let options = new RequestOptions({ headers: headers, search: data });
    return this.http.get(url, options);
  }

  post(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }

  postFormData(url: string, data: FormData) {
    let headers = new Headers();
    this.createAuthorizationHeaderWithNoContentType(headers);
    return this.http.post(url, data, {
      headers: headers
    });
  }

  put(url, data) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.put(url, data, {
      headers: headers
    });
  }

  delete(url) {
    let headers = new Headers();
    this.createAuthorizationHeader(headers);
    return this.http.delete(url, {
      headers: headers
    });
  }
}