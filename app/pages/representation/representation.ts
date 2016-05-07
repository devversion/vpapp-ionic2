import {IonicApp, Page, Alert, Loading, NavController, MenuController} from "ionic-angular";
import {BackendConnector} from "../../services/BackendConnector";
import {SessionAccessor} from "../../services/SessionAccessor";
import {RepresentationCache} from "../../services/RepresentationCache";
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
  providers: [BackendConnector, SessionAccessor, RepresentationCache, DateUtil, JWTDecoder],
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

  isLoadingToday: boolean = false;
  isLoadingTomorrow: boolean = false;

  selectedSegment = 'today';
  slides: Array<any>;

  isMenuAnimating: boolean = false;

  constructor(private backend: BackendConnector,
              private nav: NavController,
              private session: SessionAccessor,
              private cache: RepresentationCache,
              private dateUtil: DateUtil,
              private jwtDecoder: JWTDecoder,
              private menu: MenuController,
              private app: IonicApp) {

    this.todayDate = dateUtil.getTodayDate();
    this.tomorrowDate = dateUtil.getTomorrowDate();

    session.getToken().then((token) => {
      this.currentUser = JSON.parse(jwtDecoder.decodeToken(token)).username;
      this.currentClass = JSON.parse(jwtDecoder.decodeToken(token)).class;
      this.refreshTodayRepresentations(session, backend);
      this.refreshTomorrowRepresentations(session, backend);
    });
  }

  onSegmentDayChanged(segmentButton) {
    var sliderComponent = this.app.getComponent('loopSlider');

    const selectedIndex = this.slides.findIndex((slide) => {
      return slide.key === segmentButton.value;
    });
    sliderComponent.slider.slideTo(selectedIndex);
  }

  onSlideDayChanged(slider) {
    const currentSlide = this.slides[slider.activeIndex];
    this.selectedSegment = currentSlide.key;
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
    this.toggleMenu();
  }

  showImpressum() {
    this.menu.close().then(() => {
      this.nav.setRoot(ContactPage);
    });
  }

  refreshTodayRepresentations(session: SessionAccessor, backend: BackendConnector, refresher?) {
    this.isLoadingToday = true;

    var loadingDialog = Loading.create({
      content: 'Lade Vertretungen...'
    });
    this.nav.present(loadingDialog);

    session.getToken().then((token) => {
      (this.todayPromise = backend.sendRepresentationRequest(this.dateUtil.getTodayDate(), token))
          .then(success => {
            this.todayDate = this.dateUtil.getTodayDate();
            this.cache.setTodayRepresentations(success, this.todayDate);
            this.isLoadingToday = false;
            loadingDialog.dismiss();
          }, error => {
            this.isLoadingToday = false;
            loadingDialog.dismiss();
            this.nav.present(Alert.create({
              title: 'Keine Verbindung.',
              subTitle: 'Es konnte keine Verbindung hergestellt werden. ' +
                  'Die Vertretungen wurden aus dem Zwischenspeicher geladen!',
              buttons: ['OK']
            }));
            this.todayPromise = this.cache.getTodayRepresentations();
            this.cache.getTodayDate().then(success => {
              this.todayDate = new Date(success);
            });
          });

      this.slides = [{
        data: this.todayPromise,
        key: 'today'
      }, {
        data: this.tomorrowPromise,
        key: 'tomorrow'
      }];
    });
    if (refresher) refresher.complete();
  }

  refreshTomorrowRepresentations(session: SessionAccessor, backend: BackendConnector, refresher?) {
    this.isLoadingTomorrow = true;

    var loadingDialog = Loading.create({
      content: 'Lade Vertretungen...'
    });
    this.nav.present(loadingDialog);

    session.getToken().then((token) => {
      (this.tomorrowPromise = backend.sendRepresentationRequest(this.dateUtil.getTomorrowDate(), token))
          .then(success => {
            this.tomorrowDate = this.dateUtil.getTomorrowDate();
            this.cache.setTomorrowRepresentations(success, this.tomorrowDate);
            this.isLoadingTomorrow = false;
            loadingDialog.dismiss();
          }, error => {
            this.isLoadingTomorrow = false;
            loadingDialog.dismiss();
            if(!refresher) this.nav.present(Alert.create({
              title: 'Keine Verbindung.',
              subTitle: 'Es konnte keine Verbindung hergestellt werden. ' +
                  'Die Vertretungen wurden aus dem Zwischenspeicher geladen!',
              buttons: ['OK']
            }));
            this.tomorrowPromise = this.cache.getTomorrowRepresentations();
            this.cache.getTomorrowDate().then(success => {
              this.tomorrowDate = new Date(success);
            });
          });

      this.slides = [{
        data: this.todayPromise,
        key: 'today'
      }, {
        data: this.tomorrowPromise,
        key: 'tomorrow'
      }];
    });
    if (refresher) refresher.complete();
  }
}