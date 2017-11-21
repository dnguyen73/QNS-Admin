import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { AuthService } from "../shared/services/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  isLoggedIn : Observable<boolean>;
  constructor(private _router: Router, private authService : AuthService ) { 
    this.isLoggedIn = authService.isLoggedIn();
  }

  ngOnInit() {
  }

  // @HostListener('window:beforeunload')
  // clearToken() {
  //   this.authService.logout();
  // }

  login(){
    this._router.navigate(['/login']);
  }

  logout(){
    this.authService.logout();
    this._router.navigate(['/login']);
  }
}
