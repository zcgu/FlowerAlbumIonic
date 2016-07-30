import {NavController, Modal, NavParams} from 'ionic-angular';
import {Component} from '@angular/core';

@Component({
  templateUrl: 'build/pages/zoomview/zoomview-simple.html'
})
export class ZoomviewSimple {
  private url: any;

  constructor(private params: NavParams) {
    this.url = params.get('url');
  }

}