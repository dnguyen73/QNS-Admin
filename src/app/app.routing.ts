import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { NotfoundComponent } from './notfound/notfound.component';

const appRoutes: Route[] = [
    { path: '', component: HomeComponent },
    { path: 'category', component: CategoryComponent },
    { path: 'product', component: ProductComponent },
    { path: '**', component: NotfoundComponent }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);