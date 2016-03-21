import {Page, ViewController, NavParams} from "ionic-angular/index";
import {ToTitlePipe} from "../pipes/ToTitlePipe";

@Page({
  templateUrl: 'build/modals/moredetails.html',
  pipes: [ToTitlePipe]
})
export class MoreDetailsModal {

  representation: any;

  constructor(private viewCtrl: ViewController, private params: NavParams) {
    this.representation = params.get('representation');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}