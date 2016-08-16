import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {APP_PROVIDERS} from './app-factory';
import {GalleryPage} from './pages/gallery/gallery'
declare var cordova: any

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {

  private rootPage: any;

  constructor(private platform: Platform) {
    

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.rootPage = GalleryPage;
      StatusBar.styleDefault();
      // cordova.plugins.Keyboard.disableScroll(true)
    });
  }
}

ionicBootstrap(MyApp, APP_PROVIDERS);
