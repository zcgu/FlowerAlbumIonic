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
          let imageEntity = new ImageEntity(element.name,
            element.nativeURL,
            element.nativeURL,
            element.nativeURL,
            true,
            "");

          imageEntities.push(imageEntity);
        } else {
          let imageEntity = new ImageEntity("1",
            FOLDER_IMAGE_PATH,
            FOLDER_IMAGE_PATH,
            FOLDER_IMAGE_PATH,
            false,
            element.nativeURL);
          imageEntities.push(imageEntity);
        }
      });

      return imageEntities;

    });


  }


}

const FOLDER_IMAGE_PATH = "img/folder.png";