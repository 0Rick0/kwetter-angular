import { Injectable } from '@angular/core';
import {User} from "./user";
import {Observable} from "rxjs";
import {Http, Response, Headers, RequestOptions, RequestMethod} from "@angular/http";
import {ApiEndpoints} from "./api-endpoints";
import {sprintf} from "sprintf-js";
import {Kwet} from "./kwet";

@Injectable()
export class UserService {

  loggedIn: boolean = false;
  username: string = null;
  password: string = null;

  constructor(private http:Http) { }

  public login(username: string, password: string): Observable<User>{
    this.username = username;
    this.password = password;
    this.loggedIn = true;
    let requestOptions = new RequestOptions({
      method: RequestMethod.Get,
      url: sprintf(ApiEndpoints.userAuthInfo,{username: username}),
      headers: this.getAuthHeader()
    });

    return this.http.get(sprintf(ApiEndpoints.userAuthInfo, {username: username}), requestOptions)
      .map(this.handleResponse)
      .catch(e => {
        this.username = null;//login failure
        this.password = null;
        this.loggedIn = false;
        alert("Login Failed!");
        return this.handleError(e);
      });
  }

  public getUser(username: string): Observable<User>{
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
      const body = error.text() || '';
      const err = body || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  public getAuthHeader(): Headers{
    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(this.username + ":" + this.password));
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    return headers;
  }

}
