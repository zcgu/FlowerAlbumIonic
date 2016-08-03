import {Component} from '@angular/core';
import {NavController, Modal, NavParams, Loading, Alert} from 'ionic-angular';
import {ImageEntity} from '../../utils/image-entity';
import {GalleryPage} from '../gallery/gallery'

@Component({
  templateUrl: 'build/pages/detail/detail.html'
})
export class DetailPage {
  private imageEntity: ImageEntity;
  private parent: GalleryPage;

  constructor(private nav: NavController,
    private params: NavParams
  ) {
    this.imageEntity = params.get('image');
    this.parent = params.get('parent');
    console.log(this.parent.galleryLoaded);
  }
}
