import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from './../../shared/services/category.service';
import { Category } from './../../shared/models/category';
import { ICategoryGroup } from "../../shared/interfaces/ICategoryGroup";

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
  constructor(private categorySvc: CategoryService) { }

  ngOnInit() {
    this.fetchCategories(this.group.id);
  }

  fetchCategories(groupId: number){
    this.categorySvc.getCategoriesById(groupId)
      .subscribe((categories) => this.categories = categories);
  }

  addCategory() {
    this.newCategory.parentId = this.group.id;
    this.categorySvc
      .addCategory(this.newCategory)
      .subscribe(
        (newCategory) => {
          this.categories.push(newCategory);
        }
      )
    this.newCategory = new Category();
  }

  removeCategory(category: Category){
    this.categorySvc
      .removeCategory(category.id)
      .subscribe(
        (_) => {
          this.fetchCategories(this.group.id);
        }
      )
  }

}
