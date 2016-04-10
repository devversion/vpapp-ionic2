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
  }
}
