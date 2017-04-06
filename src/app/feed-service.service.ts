import { Injectable } from '@angular/core';
import {Kwet} from "./kwet";
import {Http, Response} from "@angular/http";
import {ApiEndpoints} from "./api-endpoints";
import {Observable} from "rxjs";

@Injectable()
export class FeedServiceService {

  constructor(private http:Http) { }

  public getFeed(username: string, start: number = 0, count: number = 10): Observable<Kwet[]>{
    return this.http.get(ApiEndpoints.feedUser.replace(":username", username))
                    .map(this.handleResponse)
                    .catch(this.handleError);
  }

  private handleResponse(resp: Response){
    let data = resp.json();
    return data.data || {};
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
