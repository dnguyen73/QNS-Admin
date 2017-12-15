import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from "rxjs/Observable";
import { Policy } from "../models/policy";
import { environment } from "../../../environments/environment";
import { HttpClient } from "./http-client.service";

const POLICY_URL: string = environment.apiUrl + '/policies';

@Injectable()
export class PolicyService {

  constructor(private _http: HttpClient) { }

  /**
     * Grab all policy items from loopback api
     */
  getAllPolicies(): Observable<Policy[]> {
    return this._http
      .get(POLICY_URL)
      .map(res => {
        const policy = res.json();
        return policy.map((p) => new Policy(p));
      })
      .catch(this.handleError);
  }

  /**
   * Update existing policy by a new one -> update policy properties
   * Note: Http post request will be cold if there is not any subcribe() call
   */
  updatePolicy(policy: Policy): Observable<Policy> {
    return this._http
      .put(POLICY_URL + "/" + policy.id, policy)
      .map((res) => {
        return new Policy(res.json());
      })
      .catch(this.handleError);
  }

  /**
   * Change policy content base on type of policy from loopback api
   */
  changePolicyContent(type: string, newContent: string): Observable<Policy> {
    return this._http
      .post(POLICY_URL + "/changeContent", { type: type, content: newContent })
      .map(res => {
        const policy = res.json();
        return new Policy(policy);
      })
      .catch(this.handleError);
  }

  /**
   * Remove existing product
   */
  deletePolicy(policy: Policy): Observable<any> {
    return this._http
      .delete(POLICY_URL + "/" + policy.id)
      .map((res) => {
        return res.json();
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
