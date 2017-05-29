import {Component, Input, OnInit} from '@angular/core';
import {Kwet} from "../kwet";
import {UserService} from "../user.service";
import {FeedServiceService} from "../feed-service.service";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'app-kwet',
  templateUrl: './kwet.component.html',
  styleUrls: ['./kwet.component.css'],
  providers: [FeedServiceService]
})
export class KwetComponent implements OnInit {

  @Input() kwet: Kwet;
  username: string;

  constructor(private userService: UserService, private feedService: FeedServiceService) {
    this.username = userService.username;
  }

  public hasLiked():boolean{
    if(this.kwet.liked_by == null)
      return false;
    for (let like of this.kwet.liked_by){
      if (like.username == this.username)
        return true;
    }
    return false;
  }

  ngOnInit() {
  }

  like(kwetId: number){
    if(this.userService.loggedIn)
        this.feedService.likeKwet(this.username, this.userService.password, kwetId).subscribe(
          r => {
            if(typeof r == "string"){
              alert("Failed to post\nReason: " + r);
              return;
            }
            this.feedService.getKwetById(kwetId).subscribe(k => this.kwet = k);
          }
        );
  }

}
