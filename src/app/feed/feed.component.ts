import { Component, OnInit } from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Kwet} from "../kwet";
import {FeedServiceService} from "../feed-service.service";

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  providers: [Title, FeedServiceService]
})
export class FeedComponent implements OnInit {

  public kwetsDefault: Kwet[];

  constructor(private titleService: Title, private feedService: FeedServiceService) {
    titleService.setTitle("Feed");
    this.getKwets();
  }

  public getKwets(){
    this.feedService.getFeed("Rick").subscribe(
      kwets => this.kwetsDefault = kwets
    );
  }

  ngOnInit() {
  }

}
