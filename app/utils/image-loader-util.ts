import {Injectable} from '@angular/core';
import {File, ImagePicker} from 'ionic-native'
import {ImageEntity} from './image-entity';

@Injectable()
export class ImageLoader {
  constructor() {
  }

  getListOfImages(path: string): Promise<ImageEntity[]> {

    return File.listDir(path, '').then(files => {

      let imageEntities: ImageEntity[] = [];

      files.forEach(element => {
        if (element.isFile) {
          let imageEntity = new ImageEntity(0, true, element.nativeURL);

          // hide file.
          let index = imageEntity.url.lastIndexOf('/');
          if (imageEntity.url[index + 1] != '.') {
            imageEntities.push(imageEntity);
          }
        } else {
          let imageEntity = new ImageEntity(0, false, element.nativeURL);

          // hide dir.
          if (imageEntity.name[0] != '.') {
            imageEntities.push(imageEntity);
          }
        }
      });

      return imageEntities;

    });

  }

}
