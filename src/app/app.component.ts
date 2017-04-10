import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {Kwet} from "./kwet";
import {FeedServiceService} from "./feed-service.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Title, FeedServiceService]
})
export class AppComponent {

  searchQuery: string = '';
  searchResults: Kwet[];

  constructor(private titleService: Title, private feedService: FeedServiceService) {
    titleService.setTitle("Startup");
  }

  public getPageTitle(): string {
    return this.titleService.getTitle();
  }

  public isSearching(): boolean{
    let isSearching = this.searchQuery != null && this.searchQuery != '';
    if(!isSearching)
      this.searchResults = [];
    return isSearching;
  }

  public search(){
    this.searchResults = [];
    if(this.isSearching())
        this.feedService.searchKwets(this.searchQuery).subscribe(r=>this.searchResults = r);
  }
}
