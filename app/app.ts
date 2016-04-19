import 'rxjs/Rx';
import {App} from 'ionic-angular';
import {LoginPage} from './pages/login/login';
import {SessionAccessor} from "./services/SessionAccessor";
import {RepresentationPage} from "./pages/representation/representation";

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [SessionAccessor]
})
export class VPApp {
  rootPage: any;

  constructor(private session: SessionAccessor) {

    // This checks the session and applies the correct root page.
    session.getToken().then((token) => {
      this.rootPage = token ? RepresentationPage : LoginPage;
    }, () => {
      this.rootPage = LoginPage
    });

    document.addEventListener('deviceready', () => {
      this._enableNotifications();
      this._setStatusBarColor();
    });
  }

  _setStatusBarColor() {
    if(cordova.platformId == 'android') {
      StatusBar.styleDefault();
      StatusBar.backgroundColorByHexString('#BDBDBD');
    }
  }

  _enableNotifications() {

    cordova.plugins.notification.local.registerPermission((granted: boolean) => {
      if (!granted) return;

      let push = PushNotification.init({
        android: {
          senderID: "103734954308",
          topics: ['global']
        },
        ios: {
          senderID: "103734954308",
          topics: ['global'],
          alert: true,
          badge: true,
          sound: true
        },
        windows: {}
      });

      push.on('notification', (data) => {
        cordova.plugins.notification.local.schedule({
          id: 1,
          title: data.title,
          text: data.message,
          icon: 'res://icon.png'
        });
      });

      push.on('error', (e) => {
        console.error(e);
      });

    });

  }
}