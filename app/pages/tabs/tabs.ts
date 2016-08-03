import {Component} from '@angular/core';
import {AboutPage} from '../about/about';
import {LoginPage} from '../login/login';
import {GalleryPage} from '../gallery/gallery'

@Component({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {

  private tab2Root: any;
  private tab3Root: any;
  private tab4Root: any;

  constructor() {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    this.tab2Root = AboutPage;
    this.tab3Root = GalleryPage;
    this.tab4Root = LoginPage;
  }
}
