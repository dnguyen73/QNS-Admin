import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

import { ProductComponent } from './product.component';
import { FilterSectionComponent } from './filter-section/filter-section.component';
import { FilterCategoryComponent } from './filter-category/filter-category.component';
import { FilterSizeComponent } from './filter-size/filter-size.component';
import { FilterPriceComponent } from './filter-price/filter-price.component';
import { FilterSaleComponent } from './filter-sale/filter-sale.component';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductSectionComponent } from './product-section/product-section.component';

//Import services
import { ProductService } from './../shared/services/product.service';

//Import PrimeNg UI Components
import { TabMenuModule, MenuItem } from 'primeng/primeng';
import { ProductNewComponent } from './product-new/product-new.component';
import { ProductUploadComponent } from './product-upload/product-upload.component';
import { FileUploadModule } from 'primeng/primeng';
import { DataTableModule, SharedModule } from 'primeng/primeng';
import { ConfirmDialogModule, ConfirmationService } from 'primeng/primeng';
import { CheckboxModule } from 'primeng/primeng';
import { InputTextModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';
import { DataGridModule } from 'primeng/primeng';
import { InputTextareaModule } from 'primeng/primeng';
import { SpinnerModule } from 'primeng/primeng';
import { InputSwitchModule } from 'primeng/primeng';
import { MessagesModule } from 'primeng/primeng';
import { ProductSizeComponent } from './product-size/product-size.component';
import { ProductStockComponent } from './product-stock/product-stock.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MomentModule,
    RouterModule.forChild([
      { path: 'products', component: ProductComponent },
      { path: 'products/add/:id', component: ProductNewComponent }
    ]),
    TabMenuModule, FileUploadModule, DataTableModule, SharedModule, ConfirmDialogModule, CheckboxModule, InputTextModule, DropdownModule,
    DataGridModule, InputTextareaModule, SpinnerModule, InputSwitchModule, MessagesModule
  ],
  providers: [ProductService, ConfirmationService],
  declarations: [ProductComponent, ProductSectionComponent, ProductSearchComponent, ProductListComponent, FilterSectionComponent, FilterCategoryComponent, FilterSizeComponent, FilterPriceComponent, FilterSaleComponent, ProductNewComponent, ProductUploadComponent, ProductSizeComponent, ProductStockComponent]
})
export class ProductModule { }
