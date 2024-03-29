import {Component} from '@angular/core';
import {NavController, NavParams, AlertController, LoadingController, ModalController} from 'ionic-angular';
import {PhotoViewerController} from '../viewer/photo-viewer-view-controller';
import {ViewPortUtil} from '../../utils/viewport-util';
import {ImageEntity} from '../../utils/image-entity';
import {ImageLoader} from '../../utils/image-loader-util';
import {ZoomviewSimple} from '../zoomview/zoomview-simple';
declare var cordova: any
import {File, ImagePicker} from 'ionic-native'
import {DetailPage} from '../detail/detail';
import {DBManager} from '../../utils/db-manager'

@Component({
  templateUrl: 'build/pages/gallery/gallery.html'
})
export class GalleryPage {

  public images: ImageEntity[] = [];
  private imageSize: number;
  public galleryLoaded: boolean = false;
  public path: string;
  private isSearchPage: boolean = false;

  constructor(private nav: NavController,
    private params: NavParams,
    private photoViewerController: PhotoViewerController,
    private imageLoaderUtil: ImageLoader,
    private dbManager: DBManager,
    private viewPortUtil: ViewPortUtil,
    private alertController: AlertController,
    private loadingController: LoadingController,
    public modalCtrl: ModalController) {
    if (params.get('path')) {
      this.path = params.get('path');
    } else {
      this.path = cordova.file.dataDirectory;
    }

    if (params.get('isSearchPage')) {
      this.isSearchPage = params.get('isSearchPage');
    }
  }

  ionViewWillEnter() {
    this.imageSize = this.setDimensions();
  }

  ionViewDidEnter() {
    if (!this.galleryLoaded) {
      this.loadGallery();
    }
  }

  loadGallery(searchWord?: string) {
    this.galleryLoaded = true;
    // this.unsplashItUtil.getListOfImages(this.imageSize).then(imageEntities => {
    //   this.images = imageEntities;
    // });
    if (searchWord) {
      this.imageLoaderUtil.getListOfImages(this.path, searchWord).then(imageEntities => {
        this.images = imageEntities;
      });
    } else {
      this.imageLoaderUtil.getListOfImages(this.path).then(imageEntities => {
        this.images = imageEntities;
      });
    }

  }

  setDimensions() {
    let screenWidth = this.viewPortUtil.getWidth();
    let potentialNumColumns = Math.floor(screenWidth / 120);
    let numColumns = potentialNumColumns > MIN_NUM_COLUMNS ? potentialNumColumns : MIN_NUM_COLUMNS;
    return Math.floor(screenWidth / numColumns);
  }

  imageClicked(imageEntity: ImageEntity, event: Event) {
    if (cordova.plugins.Keyboard.isVisible) {
      cordova.plugins.Keyboard.close();
      return;
    }

    if (imageEntity.isFile) {
      var displayImages: ImageEntity[] = [];

      for (var i = 0; i < this.images.length; i++) {
        if (this.images[i].isFile) {
          displayImages.push(this.images[i]);
        }
      }

      let modal = this.modalCtrl.create(ZoomviewSimple, {
        images: displayImages,
        image: imageEntity
      });
      modal.present({ animate: false });
    } else {
      this.nav.push(GalleryPage, { path: imageEntity.url });
    }

  }

  nameClicked(imageEntity: ImageEntity, event: Event) {
    if (cordova.plugins.Keyboard.isVisible) {
      cordova.plugins.Keyboard.close();
      return;
    }
    
    this.nav.push(DetailPage, { image: imageEntity, parent: this });
  }

  private loading: any;
  private copyNum: number;
  copyImg() {
    ImagePicker.getPictures({}).then((results) => {
      this.loading = this.loadingController.create({
        content: 'Loading...'
      });

      if (results.length > 0) {
        this.loading.present();
        this.copyNum = results.length;
      }

      for (var i = 0; i < results.length; i++) {
        var imgUrl = results[i];
        var index = imgUrl.lastIndexOf('/');
        var path = imgUrl.substring(0, index + 1);
        var name = imgUrl.substring(index + 1)


        // console.log(path, name);
        File.copyFile(path, name, this.path, '').then((result) => {

          this.dbManager.insert(result.fullPath).then((res) => {
            this.copyNum--;
            if (this.copyNum <= 0) {
              this.loading.dismiss();
              this.loadGallery();
            }
          })

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

    let alert = this.alertController.create({
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
              (res) => {
                this.dbManager.insert(res.fullPath).then((res) => {
                  this.loadGallery();
                  console.log('create dir success: ', data.name);
                })
              }, (err) => {
                console.log(err)
              }
            );

          }
        }
      ]
    });
    alert.present(alert);
  }

  gotoSearch() {
    this.nav.push(GalleryPage, { path: this.path, isSearchPage: true });
  }

  searchItems(ev: any) {
    let val = ev.target.value;

    if (!val || val.trim() == '') {
      this.images = [];
      return;
    }

    this.loadGallery(val);
  }
}

const MIN_NUM_COLUMNS: number = 3;
const MARGIN: number = 10;
