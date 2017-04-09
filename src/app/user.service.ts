import { Injectable } from '@angular/core';
import {User} from "./user";
import {Observable} from "rxjs";
import {Http, Response} from "@angular/http";
import {ApiEndpoints} from "./api-endpoints";
import {sprintf} from "sprintf-js";
import {Kwet} from "./kwet";

@Injectable()
export class UserService {

  loggedIn: boolean = true;
  username: string = "Rick";
  password: string = "aapje";

  constructor(private http:Http) { }

  public getUser(username: string = null): Observable<User>{
    if(username == null)
      username = this.username;

    return this.http.get(sprintf(ApiEndpoints.userInfo, {username: username}))
      .map(this.handleResponse)
      .catch(this.handleError);
  }

  private handleResponse(resp: Response): User{
    let data = resp.json();
    return data.data || null;
  }

  getKwetsOfUser(username: string): Observable<Kwet[]> {
    return this.http.get(sprintf(ApiEndpoints.kwetsOfUser, {username: username})).map(this.handleResponse).catch(this.handleError);
  }

  private handleError(error: Response | any){
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
