import 'rxjs/Rx';
import {App} from 'ionic-angular';
import {LoginPage} from './pages/login/login';
import {SessionAccessor} from './services/SessionAccessor';
import {RepresentationPage} from './pages/representation/representation';
import {BackendConnector} from './services/BackendConnector';
import {DateUtil} from './services/DateUtil';


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [BackendConnector, SessionAccessor, DateUtil]
})
export class VPApp {

  rootPage: any;

  constructor(private session: SessionAccessor,
              private backend: BackendConnector,
              private dateUtil: DateUtil) {

    // This checks the session and applies the correct root page.
    session.getToken().then((token) => {
      this.rootPage = token ? RepresentationPage : LoginPage;
    }, () => {
      this.rootPage = LoginPage
    });

    this.startBackgroundService(backend, session, dateUtil)
  }

  startBackgroundService(backend: BackendConnector, session: SessionAccessor, dateUtil: DateUtil) {
    document.addEventListener('deviceready', () => {
      var todayPromiseCache;
      var tomorrowPromiseCache;

      //Caches the recent representations if possible, otherwise assign an empty array
      session.getToken().then(token => {
        backend.sendRepresentationRequest(dateUtil.getTodayDate(), token).then(representationData => {
          todayPromiseCache = representationData;
        });
        backend.sendRepresentationRequest(dateUtil.getTomorrowDate(), token).then(representationData => {
          tomorrowPromiseCache = representationData
        });
      }, () => {
        todayPromiseCache = [];
        tomorrowPromiseCache = [];
      })


      // Do not show a notification on android if the app is in background mode
      cordova.plugins.backgroundMode.setDefaults({ silent: true });
      cordova.plugins.backgroundMode.enable();
      //Requests every 30 min if there are new representations
      setInterval(() => {
        //Checks if the app is running in background
        if (!cordova.plugins.backgroundMode.isActive()) return;

        session.getToken().then((token) => {

          backend.sendRepresentationRequest(dateUtil.getTodayDate(), token).then(representationData => {
            if (JSON.stringify(todayPromiseCache) !== JSON.stringify(representationData)) {
              cordova.plugins.notification.local.schedule({
                id: 1,
                title: 'Neue Vertretungen',
                text: 'Der heutige Vertretungsplan hat sich geändert.'
              });
              todayPromiseCache = representationData;
            }
          }, (reason) => {
            console.log(reason);
          });

          backend.sendRepresentationRequest(dateUtil.getTomorrowDate(), token).then(representationData => {
            if (JSON.stringify(tomorrowPromiseCache) !== JSON.stringify(representationData)) {
              cordova.plugins.notification.local.schedule({
                id: 2,
                title: 'Neue Vertretungen',
                text: 'Der morgige Vertretungsplan hat sich geändert.'
              });
              tomorrowPromiseCache = representationData;
            }
          });
        }, (reason) => {
          console.log(reason);
        });
      }, 1800000);
    }, false);
  }
}