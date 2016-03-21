import 'rxjs/Rx';
import {App, Platform} from 'ionic-angular';
import {LoginPage} from './pages/login/login';
import {SessionAccessor} from "./services/SessionAccessor";
import {RepresentationPage} from "./pages/representation/representation";


@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  providers: [SessionAccessor]
})
export class VPApp {
  rootPage: any;

  constructor(platform: Platform, session: SessionAccessor) {

    // This checks the session and applies the correct root page.
    session.getToken().then((token) => {
      this.rootPage = token ? RepresentationPage : LoginPage;
    }, () => this.rootPage = LoginPage);

    platform.ready().then(() => {
      // The platform is now ready. Note: if this callback fails to fire, follow
      // the Troubleshooting guide for a number of possible solutions:
      //
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //
      // First, let's hide the keyboard accessory bar (only works natively) since
      // that's a better default:
      //
      // Keyboard.setAccessoryBarVisible(false);
      //
      // For example, we might change the StatusBar color. This one below is
      // good for dark backgrounds and light text:
      // StatusBar.setStyle(StatusBar.LIGHT_CONTENT)
    });
  }
}
