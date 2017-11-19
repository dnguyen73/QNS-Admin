import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Category } from "../../shared/models/category";
import { Router, ActivatedRoute } from "@angular/router";
import { CategoryService } from "../../shared/services/category.service";
import { Message } from "primeng/primeng";

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.css'],
  encapsulation: ViewEncapsulation.None

})
export class CategoryDetailComponent implements OnInit {

  myCat: Category = new Category();
  msgs: Message[] = [];
  constructor(
    private _router: Router,
    private route: ActivatedRoute,
    private categorySvc: CategoryService
  ) { }

  ngOnInit() {
    let code = this.route.snapshot.params['id'];
    this.route.data
      .subscribe((data: { category: Category }) => {
        this.myCat = data.category;
      });
  }

  save(){
    //Call API service to store product item to database
        this.categorySvc
          .updateCategory(this.myCat)
          .subscribe(
          (newProduct) => {
            this.showSuccess();
          });
  }

  showSuccess() {
    this.msgs = [];
    this.msgs.push({ severity: 'success', summary: 'Success Message', detail: 'Product updated successfully!' });
  }

  //Cancel handler to go back to product list
  cancel() {
    this._router.navigate(['/categories']);
  }

}
