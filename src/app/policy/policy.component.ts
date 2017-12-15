import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PolicyService } from "../shared/services/policy.service";
import { Policy } from "../shared/models/policy";

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  refundPolicy: Policy = new Policy({
    type: "refund",
    content: ""
  });
  shippingPolicy: Policy = new Policy({
    type: "shipping",
    content: ""
  });
  constructor(private _router: Router, private policySvc: PolicyService) { }

  ngOnInit() {
    this.fetchAllPolicies();
  }

  //Get all policies
  fetchAllPolicies() {
    this.policySvc.getAllPolicies()
      .subscribe((policies) => {
        if (policies.length > 0) {
          this.refundPolicy = policies.find((p) => p.type === "refund");
          this.shippingPolicy = policies.find((p) => p.type === "shipping");
        }
      });
  }

  saveRefundPolicy() {
    this.save(this.refundPolicy);
  }

  saveShippingPolicy() {
    this.save(this.shippingPolicy);
  }

  save(item: Policy) {
    //Call API service to store policy item to database
    //item.isEdit = false;
    this.policySvc
      .updatePolicy(item)
      .subscribe(
      (newPolicy) => {
        alert('Cập nhật thành công');
      });
  }

}
