import { Component, OnInit } from '@angular/core';
import { CategoryService } from './../shared/services/category.service';
import { Category } from './../shared/models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  private categories: Category[] = [];
  private newCategory: Category = new Category();
  constructor(private categorySvc: CategoryService) { }

  ngOnInit() {
    this.categorySvc.getAllCategories()
      .subscribe((categories) => this.categories = categories);
  }

  addCategory() {
    this.newCategory.parentId = 3;
    this.categorySvc
      .addCategory(this.newCategory)
      .subscribe(
        (newCategory) => {
          this.categories.push(newCategory);
        }
      )
    //this.newCategory = new Category();
  }

}
