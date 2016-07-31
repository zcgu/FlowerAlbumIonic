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
            element.nativeURL,
            true);

          imageEntities.push(imageEntity);
        } else {
          let imageEntity = new ImageEntity("1",
            FOLDER_IMAGE_PATH,
            FOLDER_IMAGE_PATH,
            FOLDER_IMAGE_PATH,
            false);
          imageEntities.push(imageEntity);
        }
      });

      return imageEntities;

    });


  }


}

const FOLDER_IMAGE_PATH = "img/folder.png";