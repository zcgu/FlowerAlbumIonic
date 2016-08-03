import {Component} from '@angular/core';
import {NavController, Modal, NavParams, Loading, Alert} from 'ionic-angular';
import {ImageEntity} from '../../utils/image-entity';
import {GalleryPage} from '../gallery/gallery';
import {DBManager} from '../../utils/db-manager';


@Component({
  templateUrl: 'build/pages/detail/detail.html'
})
export class DetailPage {
  private imageEntity: ImageEntity;
  private parent: GalleryPage;

  TABLE_NAME = 'images';
  ID = 'id';
  URL = 'url';
  CHINESE_NAME = 'chinesename';
  OTHER_NAME = 'othername';
  KE = 'ke'
  SHU = 'shu';
  LATIN_NAME = 'latinname';
  TIME = 'time';
  PLACE = 'place';
  URL_INDEX = 'urlindex';

  constructor(private nav: NavController,
    private params: NavParams,
    private dbManager: DBManager) {
    this.imageEntity = params.get('image');
    this.parent = params.get('parent');
  }

  update(col: string) {
    let alert = Alert.create({
      title: '更新',
      inputs: [
        {
          name: 'input',
          placeholder: '新的值'
        }
      ],
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: data => {

            this.dbManager.update(this.imageEntity.id, data.input, col).then((success) => {
              this.parent.galleryLoaded = false;
              this.nav.pop();
            }, (err) => {
              console.log(err);
            });

          }
        }
      ]
    });
    this.nav.present(alert);
  }
}

