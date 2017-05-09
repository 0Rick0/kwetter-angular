import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: []
})
export class LoginComponent implements OnInit {

  usernameInput: string = '';
  passwordInput: string = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  public loginClick(){
    this.userService.login(this.usernameInput, this.passwordInput).subscribe(l=>{
      if(l == null){
        alert("Login Failed!" + l);
      }else{
        this.router.navigateByUrl("/feed");
      }
    });
  }
}
