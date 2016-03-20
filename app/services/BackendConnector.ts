import {Injectable, Inject} from 'angular2/core';
import {Http, Response, Headers} from "angular2/http";
import {URLEncoder} from "./URLEncoder";

@Injectable()
export class BackendConnector {

  private BACKEND_URL = 'https://vpbackend.herokuapp.com';

  constructor(@Inject(Http) private http: Http) {

  }

  sendLoginRequest(username: string, password: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      this.http.post(this.BACKEND_URL + '/session/login', URLEncoder.encode({
        username: username,
        password: password
      }), {
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      }).subscribe((res: Response) => {
        resolve(res.json());
      }, (err: any) => {
        reject(err.json() || 'The login request failed');
      });
    });
  }

}