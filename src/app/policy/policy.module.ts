import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../shared/services/auth-guard.service";
import { PolicyComponent } from "./policy.component";
import { PolicyService } from "../shared/services/policy.service";

import { CKEditorModule } from 'ng2-ckeditor';

import { SharedModule } from 'primeng/primeng';
import {ButtonModule} from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CKEditorModule,
    RouterModule.forChild([
      { path: '', component: PolicyComponent, canActivate: [AuthGuard]  }
    ]),
    SharedModule, ButtonModule
  ],
  providers: [PolicyService],
  declarations: [PolicyComponent]
})
export class PolicyModule { }
