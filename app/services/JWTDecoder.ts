import {Injectable} from "angular2/core";

@Injectable()
export class JWTDecoder {

  decodeToken(token: string): string {
    return atob(token.split('.')[1]);
  }
}