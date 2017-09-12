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
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'categories', component: CategoryComponent }
    ]),
    InputTextModule,
    FieldsetModule, ButtonModule, DataTableModule, SharedModule,
    ConfirmDialogModule
  ],
  declarations: [CategoryComponent, CategoryGroupComponent],
  providers: [CategoryService, ConfirmationService]
})
export class CategoryModule { }
