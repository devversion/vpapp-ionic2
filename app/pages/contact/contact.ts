import {Page, NavController, MenuController} from 'ionic-angular/index';
import {SessionAccessor} from '../../services/SessionAccessor';
import {JWTDecoder} from '../../services/JWTDecoder'
import {LoginPage} from "../login/login";
import {RepresentationPage} from "../representation/representation";

@Page({
  templateUrl: 'build/pages/contact/contact.html',
  providers: [SessionAccessor, JWTDecoder]
})
export class ContactPage {

  isMenuAnimating: boolean = false;
  currentUser: string;
  currentClass: string;

  constructor(private nav: NavController,
              private session: SessionAccessor,
              private jwtDecoder: JWTDecoder,
              private menu: MenuController) {

    session.getToken().then((token) => {
      this.currentUser = JSON.parse(jwtDecoder.decodeToken(token)).username;
      this.currentClass = JSON.parse(jwtDecoder.decodeToken(token)).class;
    });
  }

  showRepresentations() {
    this.menu.close().then(() => {
      this.nav.setRoot(RepresentationPage);
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
}