import {Component} from '@angular/core';
import {NavController, Modal, NavParams, Loading, Alert} from 'ionic-angular';
import {PhotoViewerController} from '../viewer/photo-viewer-view-controller';
import {ViewPortUtil} from '../../utils/viewport-util';
import {ImageEntity} from '../../utils/image-entity';
import {ImageLoader} from '../../utils/image-loader-util';
import {ZoomviewSimple} from '../zoomview/zoomview-simple';
declare var cordova: any
import {File, ImagePicker} from 'ionic-native'

@Component({
  templateUrl: 'build/pages/gallery/gallery.html'
})
export class GalleryPage {

  private images: ImageEntity[] = [];
  private imageSize: number;
  private galleryLoaded: boolean = false;
  private path: string;

  //   constructor(private nav: NavController, private photoViewerController: PhotoViewerController, private unsplashItUtil: UnsplashItUtil, private viewPortUtil: ViewPortUtil) {
  //   }
  constructor(private nav: NavController,
    private params: NavParams,
    private photoViewerController: PhotoViewerController,
    private imageLoaderUtil: ImageLoader,
    private viewPortUtil: ViewPortUtil) {
    if (!this.path) {
      if (params.get('path')) {
        this.path = params.get('path');
      } else {
        this.path = cordova.file.dataDirectory;
      }
    }

    console.log(this.path);
  }

  ionViewWillEnter() {
    this.imageSize = this.setDimensions();
  }

  ionViewDidEnter() {
    if (!this.galleryLoaded) {
      this.loadGallery();
    }
    console.log(this.path);
  }

  loadGallery() {
    this.galleryLoaded = true;
    // this.unsplashItUtil.getListOfImages(this.imageSize).then(imageEntities => {
    //   this.images = imageEntities;
    // });
    this.imageLoaderUtil.getListOfImages(this.path).then(imageEntities => {
      this.images = imageEntities;
      console.log("Load gallery: ", this.images);
    });

  }

  setDimensions() {
    let screenWidth = this.viewPortUtil.getWidth();
    let potentialNumColumns = Math.floor(screenWidth / 120);
    let numColumns = potentialNumColumns > MIN_NUM_COLUMNS ? potentialNumColumns : MIN_NUM_COLUMNS;
    return Math.floor(screenWidth / numColumns);
  }

  imageClicked(imageEntity: ImageEntity, event: Event) {
    if (imageEntity.isFile) {
      let modal = Modal.create(ZoomviewSimple, {
        images: this.images,
        image: imageEntity
      });
      console.log(modal);
      this.nav.present(modal, { animate: false });
    } else {
      this.nav.push(GalleryPage, { path: imageEntity.path });
    }

  }

  private loading: any;
  private copyNum: number;
  copyImg() {
    ImagePicker.getPictures({}).then((results) => {
      this.loading = Loading.create({
        content: 'Loading...'
      });

      if (results.length > 0) {
        this.nav.present(this.loading);
        this.copyNum = results.length;
      }

      for (var i = 0; i < results.length; i++) {
        var imgUrl = results[i];
        var index = imgUrl.lastIndexOf('/');
        var path = imgUrl.substring(0, index + 1);
        var name = imgUrl.substring(index + 1)


        // console.log(path, name);
        File.copyFile(path, name, this.path, '').then((result) => {
          this.copyNum--;
          if (this.copyNum <= 0) {
            this.loading.dismiss();
            this.loadGallery();
          }
        }, (err) => {
          this.copyNum--;
          if (this.copyNum <= 0) {
            this.loading.dismiss();
            this.loadGallery();
          }
          console.log(err)
        });
      }
    }, (err) => {
      console.log(err);
    });
  }

  createDir() {

    let alert = Alert.create({
      title: 'New Folder',
      inputs: [
        {
          name: 'name',
          placeholder: 'Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Create',
          handler: data => {

            File.createDir(this.path, data.name, false).then(
              (success) => {
                console.log('create dir success');
                this.loadGallery();
              }, (err) => {
                console.log(err)
              }
            );

          }
        }
      ]
    });
    this.nav.present(alert);
  }
}

const NUM_IMAGES: number = 500;
const MIN_NUM_COLUMNS: number = 3;
const MARGIN: number = 10;
