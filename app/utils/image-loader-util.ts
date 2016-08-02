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

          // hide file.
          let index = imageEntity.fullSizeUrl.lastIndexOf('/');
          if (imageEntity.fullSizeUrl[index + 1] != '.') {
            imageEntities.push(imageEntity);
          }
        } else {
          let imageEntity = new ImageEntity("1",
            FOLDER_IMAGE_PATH,
            FOLDER_IMAGE_PATH,
            FOLDER_IMAGE_PATH,
            false,
            element.nativeURL);

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

const FOLDER_IMAGE_PATH = "img/folder.png";