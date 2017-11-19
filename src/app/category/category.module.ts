import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CategoryComponent } from './category.component';
import { CategoryGroupComponent } from './category-group/category-group.component';
import { CategoryService } from './../shared/services/category.service';

//Import PrimeNg UI Components
import { InputTextModule } from 'primeng/primeng';
import { FieldsetModule, ButtonModule } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService, MessagesModule } from 'primeng/primeng';
import { AuthGuard } from "../shared/services/auth-guard.service";
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryDetailResolve } from "./category-detail/category-detail-resolve.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: CategoryComponent, canActivate: [AuthGuard]  },
      {
        path: 'detail/:id', component: CategoryDetailComponent, resolve: {
          category: CategoryDetailResolve
        },
      }
    ]),
    InputTextModule,
    FieldsetModule, ButtonModule, DataTableModule, SharedModule, MessagesModule,
    ConfirmDialogModule
  ],
  declarations: [CategoryComponent, CategoryGroupComponent, CategoryDetailComponent],
  providers: [CategoryService, CategoryDetailResolve, ConfirmationService]
})
export class CategoryModule { }
