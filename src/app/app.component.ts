import {Component} from '@angular/core';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [Title]
})
export class AppComponent {
  constructor(private titleService: Title) {
    titleService.setTitle("Startup");
  }

  public getPageTitle(): string {
    return this.titleService.getTitle();
  }
}
