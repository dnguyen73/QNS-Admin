import { Component, OnInit } from '@angular/core';
import { Province } from "../shared/models/province";
import { Router } from "@angular/router";
import { ProvinceService } from "../shared/services/province.service";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  provinces: Province[] = [];
  constructor(private _router: Router, private provinceSvc: ProvinceService) { }

  ngOnInit() {
    this.fetchAllProvinces();
  }

  //Get all provinces
  fetchAllProvinces() {
    this.provinceSvc.getAllProvinces()
      .subscribe((provinces) => this.provinces = provinces);
  }

  edit(item: Province) {
    item.isEdit = true;
  }
  save(item: Province) {
    //Call API service to store province item to database
    item.isEdit = false;
    this.provinceSvc
      .updateProvince(item)
      .subscribe(
      (newProvince) => {
        this.fetchAllProvinces();
      });
  }
  cancel(item: Province) {
    item.isEdit = false;
    this.fetchAllProvinces();
  }
}
