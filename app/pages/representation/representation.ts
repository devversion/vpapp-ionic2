import {Page, NavController, Modal} from "ionic-angular/index";
import {BackendConnector} from "../../services/BackendConnector";
import {SessionAccessor} from "../../services/SessionAccessor";
import {ToTitlePipe} from "../../pipes/ToTitlePipe";
import {ToIconPipe} from "../../pipes/ToIconPipe";
import {AsyncDefaultPipe} from "../../pipes/AsyncDefaultPipe";
import {MoreDetailsModal} from "../../modals/moredetails";
import {LoginPage} from "../login/login";

@Page({
  templateUrl: 'build/pages/representation/representation.html',
  providers: [BackendConnector, SessionAccessor],
  pipes: [ToTitlePipe, ToIconPipe, AsyncDefaultPipe]
})
export class RepresentationPage {

  viewDay: string = 'today';
  todayDate: Date;
  tomorrowDate: Date;
  todayPromise: Promise<any>;
  tomorrowPromise: Promise<any>;

  constructor(private backend: BackendConnector,
              private nav: NavController,
              private session: SessionAccessor) {

    this.todayDate = this._getTodayDate();
    this.tomorrowDate = this._getTomorrowDate();

    session.getToken().then((token) => {
      this.todayPromise = backend.sendRepresentationRequest(this.todayDate, token);
      this.tomorrowPromise = backend.sendRepresentationRequest(this.tomorrowDate, token);
    });
  }

  showMore(item) {
    let moreDetails = Modal.create(MoreDetailsModal, {
      representation: item
    });

    this.nav.present(moreDetails);
  }

  logout() {
    this.session.setToken(null);
    this._switchToLoginPage();
  }

  _switchToLoginPage() {
    this.nav.setRoot(LoginPage, {}, {
      animate: true,
      direction: 'back'
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