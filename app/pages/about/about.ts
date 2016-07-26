import {Component} from '@angular/core';
import {NavController, Storage, SqlStorage} from 'ionic-angular';
import {File} from 'ionic-native'
declare var cordova: any

@Component({
  templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {
  private db: any;

  constructor(private navCtrl: NavController) {

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
    File.createDir(cordova.file.dataDirectory, 'testDir', false).then(
      (success) => {
        console.log('create dir success');
      }, (err) => {
        console.log(err)
      }
    );

  }
}
