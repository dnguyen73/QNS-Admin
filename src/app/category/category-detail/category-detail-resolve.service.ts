import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Category } from "../../shared/models/category";
import { CategoryService } from "../../shared/services/category.service";

@Injectable()
export class CategoryDetailResolve implements Resolve<Category> {

  constructor(private categorySvc: CategoryService, private router: Router) { }
    
    resolve(route: ActivatedRouteSnapshot): Observable<Category> {
        let id = route.params['id'];
        return this.categorySvc.findCategoryById(id);
    }

}
