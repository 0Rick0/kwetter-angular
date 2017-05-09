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
import { LoginComponent } from './login/login.component';
import {UserService} from "./user.service";

const appRoutes: Routes = [
  {path: 'feed', component: FeedComponent},
  {path: "feed/:username", component: FeedComponent},
  {path: "user", component: UserPageComponent},
  {path: "user/:username", component: UserPageComponent},
  {path: "tag", component: TagPageComponent},
  {path: "tag/:tag", component: TagPageComponent},
  {path: "login", component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    FeedComponent,
    KwetComponent,
    UserPageComponent,
    TagPageComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    FormsModule,
    HttpModule,
    NguiTabModule
  ],
  providers: [
    Title,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
