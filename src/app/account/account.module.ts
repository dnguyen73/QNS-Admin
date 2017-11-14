import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


//Import PrimeNg UI Components
import { InputTextModule } from 'primeng/primeng';
import { FieldsetModule, ButtonModule } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { LoginComponent } from "./login/login.component";
import { AuthService } from "../shared/services/auth.service";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent }
    ]),
    InputTextModule,
    FieldsetModule, ButtonModule, DataTableModule, SharedModule,
    ConfirmDialogModule
  ],
  declarations: [LoginComponent],
  providers: [AuthService, ConfirmationService]
})
export class AccountModule { }
