import {Injectable} from "angular2/core";
import {SqlStorage, Storage, LocalStorage} from "ionic-angular/index";
import {PromiseWrapper} from "angular2/src/facade/promise";

@Injectable()
export class SessionAccessor {

  localStorage: Storage;
  sqlStorage: Storage;

  constructor() {
    this.localStorage = new Storage(LocalStorage);
    this.sqlStorage = new Storage(SqlStorage);
  }

  getToken(): Promise<string> {
    if (this.localStorage.get('VP_TOKEN')) {
      return PromiseWrapper.resolve(this.localStorage.get('VP_TOKEN'));
    }

    return this.sqlStorage.get('VP_TOKEN');
  }

  setToken(token: string) {
    this.localStorage.set('VP_TOKEN', token);
    this.sqlStorage.set('VP_TOKEN', token);
  }

}