import {Page, ViewController, NavParams} from "ionic-angular/index";
import {ToTitlePipe} from "../pipes/ToTitlePipe";
import {ToIconPipe} from "../pipes/ToIconPipe";

@Page({
  templateUrl: 'build/modals/moredetails.html',
  pipes: [ToTitlePipe, ToIconPipe]
})
export class MoreDetailsModal {

  representation: any;

  constructor(private viewCtrl: ViewController, private params: NavParams) {
    this.representation = params.get('representation');
  }
}