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
  providers: [Title, FeedServiceService],
})
export class FeedComponent implements OnInit {

  public kwetsDefault: Kwet[];

  private username: string;
  private user: User;

  private newKwetText: string = '';
  private trendingTags: string[];

  private ws: WebSocket;

  constructor(private route: ActivatedRoute,
              private titleService: Title,
              private feedService: FeedServiceService,
              private userService: UserService) {
    titleService.setTitle("Feed");
    this.initVariables();
    console.log("username: " + this.userService.username);
    console.log("password: " + this.userService.password);
    console.log("url: " + ApiEndpoints.userws);
    this.ws = new WebSocket(sprintf(ApiEndpoints.userws,{username: this.userService.username, password: this.userService.password}));
    this.ws.onmessage = (ev) => this.messageHandler(ev);
  }

  private messageHandler(wsm: MessageEvent){
    let jsdata = JSON.parse(wsm.data);
    switch (jsdata.type){
      case "newkwet":
        //Insert the new kwet on the first position in the list. No reload needed :)
        this.kwetsDefault.splice(0, 0, jsdata.data);
        break;
      default:
        alert("Unkown type " + jsdata.type + ". Check console for more info.");
        console.log(jsdata);
        break;
    }
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
    return this.userService.loggedIn && this.username == this.userService.username;
  }

  private initVariables(){
    if(!this.username)
      this.username = this.userService.username;
    this.getKwets();
    this.getTrendingTags();
    this.userService.getUser(this.username).subscribe(u=>this.user = u);
    console.log(this.username);
    console.log(this.userService.username);
  }

  public comfirmText(e){
    console.log("Posting: " + e);
    let kwetobj = {type:"postKwet", data: {username: this.username, text: e}};
    let kwettxt = JSON.stringify(kwetobj);
    this.ws.send(kwettxt);
    // this.feedService.postKwet(this.username, this.userService.password, e).subscribe(nk=>{
    //   if(typeof(nk) === "string"){
    //     alert(`Failed to post!\nReason: ${nk}`);
    //   }else{
    //     //this.initVariables();//reload content //NOTE not needed anymore, now using websockets
    //   }
    // });
  }

}
