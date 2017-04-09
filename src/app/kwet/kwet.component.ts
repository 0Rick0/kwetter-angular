import {Component, Input, OnInit} from '@angular/core';
import {Kwet} from "../kwet";
import {UserService} from "../user.service";
import {FeedServiceService} from "../feed-service.service";

@Component({
  selector: 'app-kwet',
  templateUrl: './kwet.component.html',
  styleUrls: ['./kwet.component.css'],
  providers: [UserService, FeedServiceService]
})
export class KwetComponent implements OnInit {

  @Input() kwet: Kwet;
  username: string;

  constructor(private userService: UserService, private feedService: FeedServiceService) {
    this.username = userService.username;
  }

  public hasLiked():boolean{
    return this.kwet.likedBy.indexOf(this.username) >= 0;
  }

  ngOnInit() {
  }

  like(kwetId: number){
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
