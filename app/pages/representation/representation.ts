import {Page} from "ionic-angular/index";
import {BackendConnector} from "../../services/BackendConnector";
import {SessionAccessor} from "../../services/SessionAccessor";
import {ToTitlePipe} from "../../pipes/ToTitlePipe";

@Page({
  templateUrl: 'build/pages/representation/representation.html',
  providers: [BackendConnector, SessionAccessor],
  pipes: [ToTitlePipe]
})
export class RepresentationPage {

  todayData: Promise<any>;
  tomorrowData: Promise<any>;

  constructor(private backend: BackendConnector,
              session: SessionAccessor) {

    session.getToken().then((token) => {
      this.todayData = backend.sendRepresentationRequest(this._getTomorrowDate(), token);
      this.tomorrowData = backend.sendRepresentationRequest(this._getTomorrowDate(), token);
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
    // MOCKING DATE FOR TESTING
    return new Date(2016, 2, 17);
    /*
    let current = new Date();
    let dayOfWeek = current.getDay();
    let add = 1;

    if (dayOfWeek === 5) add = 3;
    else if (dayOfWeek === 6) add = 2;

    current.setDate(current.getDate() + add);

    return current;*/
  }

}