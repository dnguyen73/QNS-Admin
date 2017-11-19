import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from './../../shared/services/category.service';
import { ConfirmationService } from 'primeng/primeng';
import { Category } from './../../shared/models/category';
import { ICategoryGroup } from "../../shared/interfaces/ICategoryGroup";
import { Router } from "@angular/router";

@Component({
  selector: 'category-group',
  templateUrl: './category-group.component.html',
  styleUrls: ['./category-group.component.css']
})
export class CategoryGroupComponent implements OnInit {

  private categories: Category[] = [];
  private newCategory: Category = new Category();

  @Input()
  group: ICategoryGroup;
  constructor(private _router: Router, private categorySvc: CategoryService, private confirmationSvc: ConfirmationService) { }

  ngOnInit() {
    this.fetchCategories(this.group.id);
  }

  fetchCategories(groupId: number) {
    this.categorySvc.getCategoriesById(groupId)
      .subscribe((categories) => this.categories = categories);
  }

  addCategory() {
    this.newCategory.parentId = this.group.id;
    switch(this.group.id){
      case 1:
        this.newCategory.route = "female";
        break;
      case 2:
        this.newCategory.route = "lady";
        break;
      case 3:
        this.newCategory.route = "kids";
        break;
    }   
    this.categorySvc
      .addCategory(this.newCategory)
      .subscribe(
      (newCategory) => {
        this.categories = this.categories.concat(newCategory);
        //this.fetchCategories(this.group.id);
      }
      )
    this.newCategory = new Category();
  }

  viewDetail(category: Category){
    this._router.navigate(['categories/detail', category.id]);
  }

  removeCategory(category: Category) {
    this.confirmationSvc.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'fa fa-trash',
      accept: () => {
        this.categorySvc
          .removeCategory(category.id)
          .subscribe(
          (_) => {
            this.fetchCategories(this.group.id);
          }
          )
      },
      reject: () => { }
    });

  }


}
