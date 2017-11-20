import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'qns-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  credential: {
    username: string,
    password: string
  }
  constructor(private _router: Router, private auth: AuthService) { }

  ngOnInit() {
    this.credential = {
      username: '',
      password: ''
    };
  }

  login(){
    this.auth.login(this.credential.username, this.credential.password)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    this._router.navigate(['/products']);
                } else {
                    // login failed
                    //this.error = 'Username or password is incorrect';
                    //this.loading = false;
                }
            });
  }

}
