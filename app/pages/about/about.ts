import {Component} from '@angular/core';
import {NavController, Storage, SqlStorage, Loading, Alert, Modal} from 'ionic-angular';
import {File, ImagePicker} from 'ionic-native'
declare var cordova: any
import {ZoomviewSimple} from '../zoomview/zoomview-simple';
import {ImageEntity} from '../../utils/image-entity';

@Component({
  templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {
  private nav: any;
  private db: any;
  private loading: any;

  constructor(private navCtrl: NavController) {
    this.nav = navCtrl;
  }

  showDB() {
    this.db = new Storage(SqlStorage);
    this.db.set('name', 'Max');
    this.db.get('name').then((name) => {
      console.log(name);
    });

  }

  showDir() {
    File.listDir(cordova.file.applicationDirectory, '').then(
      (files) => {
        console.log('application dir:', files);
      }
    );

    File.listDir(cordova.file.dataDirectory, '').then(
      (files) => {
        console.log('dataDirectory dir:', files);
      }
    );
  }

  createDir() {


    let alert = Alert.create({
      title: 'Login',
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

            File.createDir(cordova.file.dataDirectory, data.name, false).then(
              (success) => {
                console.log('create dir success');
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

  pickImg() {
    ImagePicker.getPictures({}).then((results) => {
      for (var i = 0; i < results.length; i++) {
        console.log('Image URI: ' + results[i]);
      }
    }, (err) => {
      console.log(err);
    });
  }

  private copyNum: any;

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
        var dataDirectory = results[i];
        var index = dataDirectory.lastIndexOf('/');
        var path = dataDirectory.substring(0, index + 1);
        var name = dataDirectory.substring(index + 1)


        // console.log(path, name);
        File.copyFile(path, name, cordova.file.dataDirectory, '').then((result) => {
          this.copyNum--;
          if (this.copyNum <= 0) {
            this.loading.dismiss();
          }
        }, (err) => {
          this.copyNum--;
          if (this.copyNum <= 0) {
            this.loading.dismiss();
          }
          console.log(err)
        });
      }
    }, (err) => {
      console.log(err);
    });

  }

  img() {
    let image1 = new ImageEntity('1', 'img/1.jpg', 'img/1.jpg', 'img/1.jpg', true);
    let image2 = new ImageEntity('2', 'img/2.jpg', 'img/2.jpg', 'img/2.jpg', true);

    let modal = Modal.create(ZoomviewSimple, {
      images: [image1, image2],
      image: image2
    });
    this.nav.present(modal, { animate: false });


    // let modal = Modal.create(ZoomviewSimple, { url: 'img/1.jpg' });
    // this.nav.present(modal, {animate: false});


  }
}
