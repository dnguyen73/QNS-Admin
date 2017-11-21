import { ModuleWithProviders } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from "./account/login/login.component";
import { MainComponent } from "./main/main.component";
import { AuthGuard } from "./shared/services/auth-guard.service";
import { ProductModule } from "./product/product.module";

export const appRoutes: Route[] = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: '',
        component: MainComponent,
        children: [
            {
                path: '',
                component: HomeComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'products', loadChildren: './product/product.module#ProductModule'
            },
            {
                path: 'categories', loadChildren: './category/category.module#CategoryModule'
            },
            {
                path: 'orders', loadChildren: './order/order.module#OrderModule'
            },
            {
                path: 'reviews', loadChildren: './review/review.module#ReviewModule'
            },
            {
                path: 'settings', loadChildren: './setting/setting.module#SettingModule'
            }
        ],
        //canActivate: [AuthGuard]
    },
    { path: '**', component: NotfoundComponent }
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);