import {NavController, Modal, NavParams, Slides} from 'ionic-angular';
import {Component} from '@angular/core';
import {ImageEntity} from '../../utils/image-entity';


@Component({
  templateUrl: 'build/pages/zoomview/zoomview-simple.html'
})
export class ZoomviewSimple {
  private images: ImageEntity[] = [];

  private mySlideOptions = {
    initialSlide: 0,
    pager: true,
    loop: false,
  };

  constructor(private params: NavParams, private nav: NavController) {
    this.images = params.get('images');
    this.mySlideOptions.initialSlide = this.images.indexOf(params.get('image'));

    // console.log(this.images);
  }

  close() {
    setTimeout(() => {this.nav.pop()}, 100);
    // this.nav.pop();
  }
}