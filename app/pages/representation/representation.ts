import {Page, NavController, Modal, MenuController} from "ionic-angular/index";
import {BackendConnector} from "../../services/BackendConnector";
import {SessionAccessor} from "../../services/SessionAccessor";
import {ToTitlePipe} from "../../pipes/ToTitlePipe";
import {ToIconPipe} from "../../pipes/ToIconPipe";
import {AsyncDefaultPipe} from "../../pipes/AsyncDefaultPipe";
import {MoreDetailsModal} from "../../modals/moredetails";
import {LoginPage} from "../login/login";
import {AfterViewInit} from "angular2/core";

@Page({
  templateUrl: 'build/pages/representation/representation.html',
  providers: [BackendConnector, SessionAccessor],
  pipes: [ToTitlePipe, ToIconPipe, AsyncDefaultPipe]
})
export class RepresentationPage implements AfterViewInit {

  viewDay: string = 'today';
  todayDate: Date;
  tomorrowDate: Date;
  todayPromise: Promise<any>;
  tomorrowPromise: Promise<any>;

  isMenuAnimating: boolean = false;

  constructor(private backend: BackendConnector,
              private nav: NavController,
              private session: SessionAccessor,
              private menu: MenuController) {


    this.todayDate = this._getTodayDate();
    this.tomorrowDate = this._getTomorrowDate();

    session.getToken().then((token) => {
      this.todayPromise = backend.sendRepresentationRequest(this.todayDate, token);
      this.tomorrowPromise = backend.sendRepresentationRequest(this.tomorrowDate, token);
    });
  }

  ngAfterViewInit() {
    // Swipe can be only disabled after the menu is initialized.
    this.menu.swipeEnable(false);
  }

  showMore(item) {
    let moreDetails = Modal.create(MoreDetailsModal, {
      representation: item
    });

    this.nav.present(moreDetails);
  }

  toggleMenu() {
    if (this.isMenuAnimating) return;

    this.isMenuAnimating = true;
    this.menu.toggle().then(() => {
      this.isMenuAnimating = false;
    });
  }

  logout() {
    this.session.setToken(null);
    this.menu.close().then(() => {
      this.nav.setRoot(LoginPage);
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
    return new Date(2016, 2, 16);
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