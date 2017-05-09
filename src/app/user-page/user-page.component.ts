import { Component, OnInit } from '@angular/core';
import {Kwet} from "../kwet";
import {User} from "../user";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {UserService} from "../user.service";
import {ApiEndpoints} from "../api-endpoints";
import {sprintf} from "sprintf-js";

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
  providers: []
})
export class UserPageComponent implements OnInit {
  public kwetsOfUser: Kwet[];

  private username: string;
  private user: User;

  constructor(private route: ActivatedRoute,
              private titleService: Title,
              private userService: UserService) {
    titleService.setTitle("Profile");
    this.initVariables();
  }

  public getKwets(){
    this.userService.getKwetsOfUser(this.username).subscribe(
      kwets => this.kwetsOfUser = kwets
    );
  }

  public getProfileUri(username: string):string{
    return sprintf(ApiEndpoints.userPicture, {username: username});
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.username = params['username'];
      this.initVariables();
    });
  }

  private initVariables(){
    if(!this.username)
      this.username = this.userService.username;
    this.getKwets();
    this.userService.getUser(this.username).subscribe(u=>this.user = u);
  }
}
