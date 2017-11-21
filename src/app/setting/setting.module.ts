import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { DataTableModule, ConfirmDialogModule, InputTextModule, DropdownModule, CheckboxModule, MessagesModule, DataGridModule, SharedModule, ConfirmationService, TabMenuModule, InputSwitchModule } from 'primeng/primeng';
import { AuthGuard } from "../shared/services/auth-guard.service";
import { SettingComponent } from "./setting.component";
import { ProvinceService } from "../shared/services/province.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: '', component: SettingComponent, canActivate: [AuthGuard]  }
      // { path: 'products/add/:id', component: ProductNewComponent },
    //   {
    //     path: 'detail/:id', component: ReviewDetailComponent, resolve: {
    //       review: ReviewDetailResolve
    //     }
    //   }
    ]),
    TabMenuModule, DataTableModule, SharedModule, ConfirmDialogModule, CheckboxModule, InputTextModule, DropdownModule,
    DataGridModule,  MessagesModule, InputSwitchModule
  ],
  providers: [ProvinceService],
  declarations: [SettingComponent]
})
export class SettingModule { }
