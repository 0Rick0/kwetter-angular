import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Kwet} from "../kwet";
import {FeedServiceService} from "../feed-service.service";
import {UserService} from "../user.service";
import {ActivatedRoute} from "@angular/router";
import {sprintf} from "sprintf-js";
import {ApiEndpoints} from "../api-endpoints";
import {User} from "../user";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  providers: [Title, FeedServiceService, UserService],
})
export class FeedComponent implements OnInit {

  public kwetsDefault: Kwet[];

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
    this.feedService.getFeed(this.username).subscribe(
      kwets => {
        this.kwetsDefault = kwets;
        this.kwetsDefault.sort((a,b) => b.posted - a.posted);
        }
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
      this.username = params['username'];
      this.initVariables();
    });
  }

  isMyPage(): boolean{
    return this.username == this.userService.username;
  }

  private initVariables(){
    if(!this.username)
      this.username = this.userService.username;
    this.getKwets();
    this.getTrendingTags();
    this.userService.getUser(this.username).subscribe(u=>this.user = u);
  }

  public comfirmText(e){
    console.log("Posting: " + e);
    this.feedService.postKwet(this.username, this.userService.password, e).subscribe(nk=>{
      if(typeof(nk) === "string"){
        alert(`Failed to post!\nReason: ${nk}`);
      }else{
        this.initVariables();//reload content
      }
    });
  }

}
