import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../shared/services/category.service';
import { ICategoryGroup } from "../shared/interfaces/ICategoryGroup";

const CATEGORY_GROUPS: ICategoryGroup[] = [
  { id: 1, title: "Quần áo nữ" },
  { id: 2, title: "Quần áo trung niên" },
  { id: 3, title: "Quần áo trẻ em" },
  { id: 4, title: "Phụ kiện" }
];

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  //private categories: Category[] = [];
  //private newCategory: Category = new Category();
  categoryGroups = CATEGORY_GROUPS;
  constructor(private categorySvc: CategoryService) { }

  ngOnInit() {
    // this.categorySvc.getAllCategories()
    //   .subscribe((categories) => this.categories = categories);
  }

  // addCategory() {
  //   this.newCategory.parentId = 3;
  //   this.categorySvc
  //     .addCategory(this.newCategory)
  //     .subscribe(
  //       (newCategory) => {
  //         this.categories.push(newCategory);
  //       }
  //     )
  //   //this.newCategory = new Category();
  // }

}
