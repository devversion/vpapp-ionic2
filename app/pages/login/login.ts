import {Page, TextArea, NavController, Alert} from 'ionic-angular';
import {BackendConnector} from "../../services/BackendConnector";
import {RepresentationPage} from "../representation/representation";
import {SessionAccessor} from "../../services/SessionAccessor";

@Page({
  templateUrl: 'build/pages/login/login.html',
  providers: [BackendConnector, SessionAccessor]
})
export class LoginPage {

  isLoading: boolean = false;

  constructor(private backend: BackendConnector,
              private nav: NavController,
              private session: SessionAccessor) {

  }

  submitLogin(username: TextArea, password: TextArea) {
    if (this.isLoading) return;
    this.isLoading = true;

    this.backend.sendLoginRequest(username.value, password.value).then((payload) => {
      this._switchToRepresentationPage();
      this.session.setToken(payload['token']);
      this.isLoading = false;
    }, () => {
      this.nav.present(Alert.create({
        title: 'Fehler',
        message: 'Die eingegeben Benutzerdaten sind nicht korrekt.',
        buttons: [{
          text: "Schließen",
          role: 'cancel',
          handler: () => {
            this.isLoading = false
          }
        }]
      }));
    });
  }

  _switchToRepresentationPage() {
    this.nav.setRoot(RepresentationPage, {}, {
      animate: true,
      direction: 'right'
    });
  }

}
