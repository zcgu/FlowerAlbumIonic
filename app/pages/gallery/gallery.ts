import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';

import {PhotoViewerController} from '../viewer/photo-viewer-view-controller';
// import {PhotoViewer} from '../viewer/photo-viewer';
// import {TRANSITION_IN_KEY} from '../viewer/photo-viewer-transition';
import {ViewPortUtil} from '../../utils/viewport-util';
import {ImageEntity} from '../../utils/image-entity';
import {ImageLoader} from '../../utils/image-loader-util';
import {ZoomviewSimple} from '../zoomview/zoomview-simple';

@Component({
  templateUrl: 'build/pages/gallery/gallery.html'
})
export class GalleryPage {

  private images: ImageEntity[] = [];
  private imageSize: number;
  private galleryLoaded: boolean = false;

  //   constructor(private nav: NavController, private photoViewerController: PhotoViewerController, private unsplashItUtil: UnsplashItUtil, private viewPortUtil: ViewPortUtil) {
  //   }
  constructor(private nav: NavController, private photoViewerController: PhotoViewerController, private imageLoaderUtil: ImageLoader, private viewPortUtil: ViewPortUtil) {
  }

  ionViewWillEnter() {
    this.imageSize = this.setDimensions();
    if (!this.galleryLoaded) {
      this.loadGallery();
    }
  }

  loadGallery() {
    this.galleryLoaded = true;
    // this.unsplashItUtil.getListOfImages(this.imageSize).then(imageEntities => {
    //   this.images = imageEntities;
    // });
    this.imageLoaderUtil.getListOfImages(this.imageSize).then(imageEntities => {
      this.images = imageEntities;
    });

  }

  setDimensions() {
    let screenWidth = this.viewPortUtil.getWidth();
    let potentialNumColumns = Math.floor(screenWidth / 120);
    let numColumns = potentialNumColumns > MIN_NUM_COLUMNS ? potentialNumColumns : MIN_NUM_COLUMNS;
    return Math.floor(screenWidth / numColumns);
  }

  imageClicked(imageEntity: ImageEntity, event: Event) {
    // let rect = (<HTMLElement> event.target).getBoundingClientRect();
    // let modal = this.photoViewerController.create({
    //   imageEntity: imageEntity
    // });
    // modal.present({
    //   ev: {
    //     startX: rect.left,
    //     startY: rect.top,
    //     width: rect.width,
    //     height: rect.height,
    //     viewportHeight: this.viewPortUtil.getHeight(),
    //     viewportWidth: this.viewPortUtil.getWidth()
    //   }
    // });
    let modal = Modal.create(ZoomviewSimple, {url: imageEntity.fullSizeUrl});
    this.nav.present(modal);

  }
}

const NUM_IMAGES: number = 500;
const MIN_NUM_COLUMNS: number = 3;
const MARGIN: number = 10;
