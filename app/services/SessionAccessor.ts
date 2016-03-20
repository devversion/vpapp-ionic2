import {Injectable} from "angular2/core";
import {SqlStorage, Storage} from "ionic-angular/index";

@Injectable()
export class SessionAccessor {

  sqlStorage: Storage;

  constructor() {
    this.sqlStorage = new Storage(SqlStorage);
  }

  getToken(): Promise<string> {
    return this.sqlStorage.get('VP_TOKEN');
  }

  setToken(token: string) {
    return this.sqlStorage.set('VP_TOKEN', token);
  }

}