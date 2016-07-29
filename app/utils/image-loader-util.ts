import {Injectable} from '@angular/core';
import {File, ImagePicker} from 'ionic-native'
import {ImageEntity} from './image-entity';
declare var cordova: any

@Injectable()
export class ImageLoader {
  constructor() {
  }

  getListOfImages(thumbnailSize: number): Promise<ImageEntity[]> {

    return File.listDir(cordova.file.dataDirectory, '').then(files => {

      let imageEntities: ImageEntity[] = [];

      files.forEach(element => {
        if (element.isFile) {
          let imageEntity = new ImageEntity(element.name,
          element.nativeURL,
          element.nativeURL,
          element.nativeURL);

          imageEntities.push(imageEntity);
        }
      });

      return imageEntities;

    });


  }


}
