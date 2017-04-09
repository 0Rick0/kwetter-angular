import { Component, OnInit } from '@angular/core';
import {Kwet} from "../kwet";
import {User} from "../user";
import {ActivatedRoute} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {FeedServiceService} from "../feed-service.service";
import {UserService} from "../user.service";
import {ApiEndpoints} from "../api-endpoints";
import {sprintf} from "sprintf-js";

@Component({
  selector: 'app-tag-page',
  templateUrl: './tag-page.component.html',
  styleUrls: ['./tag-page.component.css'],
  providers: [Title, FeedServiceService, UserService]
})
export class TagPageComponent implements OnInit {

  public kwetsInTag: Kwet[];
  private tagName: string;

  private username: string;
  private user: User;

  private newKwetText: string = '';
  private trendingTags: string[];

  constructor(private route: ActivatedRoute,
              private titleService: Title,
              private feedService: FeedServiceService,
              private userService: UserService) {
    titleService.setTitle("Feed");
    this.initVariables();
  }

  public getKwets(){
    console.log(this.tagName);
    this.feedService.getKwetsInTag(this.tagName).subscribe(
      kwets => this.kwetsInTag = kwets
    );
  }

  public getProfileUri(username: string):string{
    return sprintf(ApiEndpoints.userPicture, {username: username});
  }

  public getTrendingTags(){
    this.feedService.getTrendingTags().subscribe(
      tags => this.trendingTags = tags
    );
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.username = this.userService.username;
      this.tagName = params['tag'];
      this.initVariables();
    });
  }

  private initVariables(){
    if(!this.username)
      this.username = this.userService.username;
    this.getKwets();
    this.getTrendingTags();
    this.userService.getUser(this.username).subscribe(u=>this.user = u);
  }
}
