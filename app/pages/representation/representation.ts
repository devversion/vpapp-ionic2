import {Page} from "ionic-angular/index";
import {BackendConnector} from "../../services/BackendConnector";
import {SessionAccessor} from "../../services/SessionAccessor";

@Page({
  templateUrl: 'build/pages/representation/representation.html',
  providers: [BackendConnector, SessionAccessor]
})
export class RepresentationPage {
  
  constructor(private backend: BackendConnector,
              session: SessionAccessor) {

    //TODO(devversion): finish this - error handling etc.
    session.getToken().then((token) => {
      backend.sendRepresentationRequest(this._getTomorrowDate(), token).then((data) => {
        console.log(data);
      });
    });
  }

  _getTodayDate(): Date {
    let current = new Date();
    let dayOfWeek = current.getDay();
    let add = 0;

    if (dayOfWeek === 0) add = -2;
    else if (dayOfWeek === 6) add = -1;

    current.setDate(current.getDate() + add);

    return current;
  }

  _getTomorrowDate(): Date {
    let current = new Date();
    let dayOfWeek = current.getDay();
    let add = 1;

    if (dayOfWeek === 5) add = 3;
    else if (dayOfWeek === 6) add = 2;

    current.setDate(current.getDate() + add);

    return current;
  }

}