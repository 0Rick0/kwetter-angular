import { Injectable } from '@angular/core';
import {Kwet} from "./kwet";
import {Http, RequestMethod, RequestOptions, Response, Headers} from "@angular/http";
import {ApiEndpoints} from "./api-endpoints";
import {Observable} from "rxjs";
import {sprintf} from "sprintf-js"

@Injectable()
export class FeedServiceService {

  constructor(private http:Http) { }

  public getFeed(username: string, start: number = 0, count: number = 10): Observable<Kwet[]>{
    return this.http.get(sprintf(ApiEndpoints.feedUser,{username: username}))
                    .map(this.handleResponse)
                    .catch(this.handleError);
  }

  public getKwetById(kwetId: number): Observable<Kwet>{
    return this.http.get(sprintf(ApiEndpoints.kwetById,{kwetid: kwetId}))
      .map(this.handleResponse)
      .catch(this.handleError);
  }

  public searchKwets(query: string): Observable<Kwet[]>{
    return this.http.get(sprintf(ApiEndpoints.search, {query: query}))
      .map(this.handleResponse)
      .catch(this.handleError);
  }

  public getTrendingTags(): Observable<string[]>{
    return this.http.get(ApiEndpoints.trendingTags).map(this.handleResponse).catch(this.handleError);
  }

  public getKwetsInTag(tagName: string): Observable<Kwet[]> {
    return this.http.get(sprintf(ApiEndpoints.kwetsByTag, {tag: tagName}))
      .map(this.handleResponse).catch(this.handleError);
  }

  public likeKwet(username: string, password: string, kwetId: number): Observable<boolean>{
    let requestOptions = new RequestOptions({
      method: RequestMethod.Get,
      url: sprintf(ApiEndpoints.likeKwet, {kwetid: kwetId}),
      headers: this.getAuthHeader(username, password)
    });


    return this.http.get(sprintf(ApiEndpoints.likeKwet, {kwetid: kwetId}), requestOptions).map(this.handleResponse).catch(this.handleError);
  }

  public postKwet(username: string, password: string, kwet: string){
    let data = `text=${encodeURIComponent(kwet)}`;
    let requestOptions = new RequestOptions({
      method: RequestMethod.Post,
      url: ApiEndpoints.postKwet,
      headers: this.getAuthHeader(username, password),
      body: data
    });


    return this.http.post(ApiEndpoints.postKwet, data, requestOptions).map(this.handleResponse).catch(this.handleError);
  }

  private getAuthHeader(username: string, password: string){
    let headers = new Headers();
    headers.append("Authorization", "Basic " + btoa(username + ":" + password));
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    return headers;
  }

  private handleResponse(resp: Response){
    let data = resp.json();
    return data.data || {};
  }

  private handleError(error: Response | any){
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      let err;
      try{
        let body = error.json() || '';
        err = body.error || JSON.stringify(body);
      }catch (e) {
        console.log(e);
        err = error;
      }
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
