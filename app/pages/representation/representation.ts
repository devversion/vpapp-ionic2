import {Page, NavController, Modal, MenuController} from "ionic-angular/index";
import {BackendConnector} from "../../services/BackendConnector";
import {SessionAccessor} from "../../services/SessionAccessor";
import {JWTDecoder} from '../../services/JWTDecoder';
import {DateUtil} from "../../services/DateUtil";
import {ToTitlePipe} from "../../pipes/ToTitlePipe";
import {ToIconPipe} from "../../pipes/ToIconPipe";
import {AsyncDefaultPipe} from "../../pipes/AsyncDefaultPipe";
import {MoreDetailsModal} from "../../modals/moredetails";
import {LoginPage} from "../login/login";
import {ContactPage} from '../contact/contact';

@Page({
  templateUrl: 'build/pages/representation/representation.html',
  providers: [BackendConnector, SessionAccessor, DateUtil, JWTDecoder],
  pipes: [ToTitlePipe, ToIconPipe, AsyncDefaultPipe]
})
export class RepresentationPage {

  currentUser: string;
  currentClass: string;
  viewDay: string = 'today';
  todayDate: Date;
  tomorrowDate: Date;
  todayPromise: Promise<any>;
  tomorrowPromise: Promise<any>;

  isMenuAnimating: boolean = false;

  constructor(private backend: BackendConnector,
              private nav: NavController,
              private session: SessionAccessor,
              private dateUtil: DateUtil,
              private jwtDecoder: JWTDecoder,
              private menu: MenuController) {

    this.todayDate = dateUtil.getTodayDate();
    this.tomorrowDate = dateUtil.getTomorrowDate();

    session.getToken().then((token) => {
      this.currentUser = JSON.parse(jwtDecoder.decodeToken(token)).username;
      this.currentClass = JSON.parse(jwtDecoder.decodeToken(token)).class;
      this.todayPromise = backend.sendRepresentationRequest(this.todayDate, token);
      this.tomorrowPromise = backend.sendRepresentationRequest(this.tomorrowDate, token);
    });
  }

  showMore(item) {
    this.nav.push(MoreDetailsModal, {
      representation: item
    });
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

  showRepresentations() {
    //Add refreshing representations
    this.toggleMenu();
  }

  showImpressum() {
    this.menu.close().then(() => {
      this.nav.setRoot(ContactPage);
    });
  }
}