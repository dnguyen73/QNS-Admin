import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import { Ng2Webstorage } from 'ngx-webstorage';
import { appRouting } from './app.routing';
//import { ProductModule } from './product/product.module';
//import { CategoryModule } from './category/category.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthHttp, AuthConfig } from 'angular2-jwt';


//Import RxJs required methods.
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';
//import { OrderModule } from "./order/order.module";
import { AccountModule } from "./account/account.module";
import { MainComponent } from './main/main.component';
import { AuthGuard } from "./shared/services/auth-guard.service";
import { HttpClient } from "./shared/services/http-client.service";

export function authHttpServiceFactory(http: Http, options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('token')),
    globalHeaders: [{ 'Content-Type': 'application/json' }],
  }), http, options);
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotfoundComponent,
    MainComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    appRouting,
    AccountModule,
    //CategoryModule,
    //ProductModule,
    //OrderModule,
    //Ng2Webstorage,
  ],
  providers: [
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    HttpClient,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
