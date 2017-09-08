import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { appRouting } from './app.routing';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { CategoryGroupComponent } from './category/category-group/category-group.component';
import { ProductComponent } from './product/product.component';
import { NotfoundComponent } from './notfound/notfound.component';

import { CategoryService } from './shared/services/category.service';

//Import RxJs required methods.
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

//Import PrimeNg UI Components
import { InputTextModule } from 'primeng/primeng';
import { FieldsetModule } from 'primeng/primeng';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CategoryComponent,
    CategoryGroupComponent,
    ProductComponent,
    NotfoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    InputTextModule,
    FieldsetModule,
    appRouting
  ],
  providers: [ CategoryService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
