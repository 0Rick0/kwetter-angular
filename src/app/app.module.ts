import {BrowserModule, Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { FeedComponent } from './feed/feed.component';
import { KwetComponent } from './kwet/kwet.component';
import { UserPageComponent } from './user-page/user-page.component';
import { TagPageComponent } from './tag-page/tag-page.component';
import { NguiTabModule } from '@ngui/tab';

const appRoutes: Routes = [
  {path: 'feed', component: FeedComponent},
  {path: "feed/:username", component: FeedComponent},
  {path: "user", component: UserPageComponent},
  {path: "user/:username", component: UserPageComponent},
  {path: "tag", component: TagPageComponent},
  {path: "tag/:tag", component: TagPageComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    KwetComponent,
    UserPageComponent,
    TagPageComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    NguiTabModule
  ],
  providers: [
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
