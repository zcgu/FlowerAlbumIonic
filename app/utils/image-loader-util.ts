import {Injectable} from '@angular/core';
import {File, ImagePicker} from 'ionic-native'
import {ImageEntity} from './image-entity';
import {DBManager} from './db-manager'

@Injectable()
export class ImageLoader {
  constructor(private dbManager: DBManager) {
  }

  getListOfImages(path: string): Promise<ImageEntity[]> {

    return File.listDir(path, '').then(files => {

      let imageEntities: ImageEntity[] = [];

      files.forEach(element => {
        console.log(element);

        this.dbManager.get(element.fullPath, element.isFile).then((imageEntity) => {

          if (element.isFile) {
            // hide file.
            let index = imageEntity.url.lastIndexOf('/');
            if (imageEntity.url[index + 1] != '.') {
              imageEntities.push(imageEntity);
            }
          } else {
            // hide dir.
            if (imageEntity.name[0] != '.') {
              imageEntities.push(imageEntity);
            }
          }

          console.log('getListOfImages for each: ', imageEntities);

        }, (err) => {
          console.log(err);
        });

      });

      return imageEntities;

    });

  }

}
