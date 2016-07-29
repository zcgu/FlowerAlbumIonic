import {Injectable} from '@angular/core';
import {App, NavOptions, ViewController, NavController} from 'ionic-angular';
import {PhotoViewer} from './photo-viewer';

export class PhotoViewerViewController extends ViewController {

  public isAlreadyDismissed: boolean;

  constructor(private app: App, opts: any = {}) {
    super(PhotoViewer, opts);
    this.isOverlay = true;

    this.fireOtherLifecycles = true;
  }

  getTransitionName(direction: string) {
    let key = 'photoViewer' + (direction === 'back' ? 'Leave' : 'Enter');
    return this._nav && this._nav.config.get(key);
  }

  static create(opts: any = {}) {
    return new PhotoViewerViewController(opts);
  }

  present(opts: NavOptions = {}){
    // console.log(this._nav);
    // TODO: 
    this.app.getRootNav().present(this, opts);
  }
}

@Injectable()
export class PhotoViewerController {
  constructor(private app: App){
  }

  create(opts: any = {}){
    return new PhotoViewerViewController(this.app, opts);
  }
}
