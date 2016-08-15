import {Component} from '@angular/core';
import {NavController, Modal, NavParams, Loading, AlertController} from 'ionic-angular';
import {ImageEntity} from '../../utils/image-entity';
import {GalleryPage} from '../gallery/gallery';
import {DBManager} from '../../utils/db-manager';
import {File, ImagePicker} from 'ionic-native'


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
    private dbManager: DBManager,
    private alertController: AlertController) {
    this.imageEntity = params.get('image');
    this.parent = params.get('parent');
  }

  update(col: string) {
    let alert = this.alertController.create({
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
              this.dbManager.get(this.imageEntity.fullPath, this.imageEntity.isFile).then((imageEntity) => {
                this.imageEntity = imageEntity;
              });
            }, (err) => {
              console.log(err);
            });

          }
        }
      ]
    });
    alert.present(alert);
  }

  delete() {
    let alert = this.alertController.create({
      title: '确定删除么？',
      message: '不可恢复',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            if (this.imageEntity.isFile) {
              var index = this.imageEntity.url.lastIndexOf('/');
              var path = this.imageEntity.url.substring(0, index + 1);
              var name = this.imageEntity.url.substring(index + 1)
              File.removeFile(path, name).then((res) => {
                this.dbManager.delete(this.imageEntity.id);
                this.parent.galleryLoaded = false;
                this.nav.pop();
              }, (err) => {
                console.log(err);
              });
            } else {
              File.removeRecursively(this.parent.path, this.imageEntity.name).then((res) => {
                this.dbManager.delete(this.imageEntity.id);
                this.parent.galleryLoaded = false;
                this.nav.pop();
              }, (err) => {
                console.log(err);
              });
            }
          }
        }
      ]
    });
    alert.present(alert);
  }
}

