import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { OrderComponent } from "./order.component";
import { DataTableModule, ConfirmDialogModule, InputTextModule, DropdownModule, CheckboxModule, MessagesModule, DataGridModule, SharedModule, ConfirmationService, TabMenuModule } from 'primeng/primeng';
import { OrderListComponent } from "./order-list/order-list.component";
import { OrderService } from "../shared/services/order.service";
import { OrderDetailComponent } from './order-detail/order-detail.component';
import { OrderDetailResolve } from "./order-detail/order-detail-resolve.service";
import { QnsPricePipe } from "../shared/pipes/qns-price.pipe";
import { OrderSearchComponent } from "./order-search/order-search.component";
import { AuthGuard } from "../shared/services/auth-guard.service";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: OrderComponent, canActivate: [AuthGuard]  },
      // { path: 'products/add/:id', component: ProductNewComponent },
      {
        path: 'detail/:code', component: OrderDetailComponent, resolve: {
          order: OrderDetailResolve
        },
      }
    ]),
    TabMenuModule, DataTableModule, SharedModule, ConfirmDialogModule, CheckboxModule, InputTextModule, DropdownModule,
    DataGridModule,  MessagesModule
  ],
  providers: [OrderService, OrderDetailResolve, ConfirmationService],
  declarations: [OrderComponent, OrderListComponent, OrderDetailComponent, QnsPricePipe, OrderSearchComponent]
})
export class OrderModule { }
