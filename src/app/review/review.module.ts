import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DataTableModule, ConfirmDialogModule, InputTextModule, DropdownModule, CheckboxModule, MessagesModule, DataGridModule, SharedModule, ConfirmationService, TabMenuModule, InputSwitchModule } from 'primeng/primeng';
import { ReviewService } from "../shared/services/review.service";
import { AuthGuard } from "../shared/services/auth-guard.service";
import { ReviewComponent } from "./review.component";
import { ReviewListComponent } from "./review-list/review-list.component";
import { ReviewSearchComponent } from "./review-search/review-search.component";
import { ReviewDetailComponent } from './review-detail/review-detail.component';
import { ReviewDetailResolve } from "./review-detail/review-detail-resolve.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ReviewComponent, canActivate: [AuthGuard]  },
      // { path: 'products/add/:id', component: ProductNewComponent },
      {
        path: 'detail/:id', component: ReviewDetailComponent, resolve: {
          review: ReviewDetailResolve
        }
      }
    ]),
    TabMenuModule, DataTableModule, SharedModule, ConfirmDialogModule, CheckboxModule, InputTextModule, DropdownModule,
    DataGridModule,  MessagesModule, InputSwitchModule
  ],
  providers: [ReviewService, ReviewDetailResolve, ConfirmationService],
  declarations: [ReviewComponent, ReviewListComponent, ReviewSearchComponent, ReviewDetailComponent]
})
export class ReviewModule { }
