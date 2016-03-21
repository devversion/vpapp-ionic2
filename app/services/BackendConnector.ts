import {Injectable, Inject} from 'angular2/core';
import {Http, Headers} from "angular2/http";
import {URLEncoder} from "./URLEncoder";
import {DateFormatter} from "./DateFormatter";

@Injectable()
export class BackendConnector {

  private BACKEND_URL = 'https://vpbackend.herokuapp.com';

  constructor(@Inject(Http) private http: Http) {

  }

  sendLoginRequest(username: string, password: string): Promise<string> {
    return this.http.post(this.BACKEND_URL + '/session/login', URLEncoder.encode({
      username: username,
      password: password
    }), {
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    }).map((res) => res.json())
      .toPromise();
  }
  
  sendRepresentationRequest(date: Date, token: string): Promise<any> {
    return this.http.get(this.BACKEND_URL + '/representation/' + DateFormatter.formatForBackend(date), {
      headers: new Headers({
        'x-access-token': token
      })
    }).map((res) => res.json())
      .toPromise();
  }

}