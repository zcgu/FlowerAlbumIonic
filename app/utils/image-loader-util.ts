import {Injectable} from '@angular/core';
import {File, ImagePicker} from 'ionic-native'
import {ImageEntity} from './image-entity';
import {DBManager} from './db-manager'

@Injectable()
export class ImageLoader {
  constructor(private dbManager: DBManager) {
  }

  getListOfImages(path: string, searchWord?: string, list?: ImageEntity[]): Promise<ImageEntity[]> {

    return File.listDir(path, '').then(files => {

      let imageEntities: ImageEntity[] = [];
      if (list) {
        imageEntities = list;
      }

      files.forEach(element => {
        this.dbManager.get(element.fullPath, element.isFile).then((imageEntity) => {

          if (element.isFile) {
            // hide file.
            let index = imageEntity.url.lastIndexOf('/');
            if (imageEntity.url[index + 1] != '.') {
              if (searchWord) {
                console.log('searchWord: ', searchWord)
                if (imageEntity.contains(searchWord)) {
                  imageEntities.push(imageEntity);
                }
              } else {
                imageEntities.push(imageEntity);
              }
            }
          } else {
            // hide dir.
            if (imageEntity.name[0] != '.') {
              if (searchWord) {
                console.log('searchWord: ', searchWord)
                if (imageEntity.contains(searchWord)) {
                  imageEntities.push(imageEntity);
                }
                this.getListOfImages(imageEntity.url, searchWord, imageEntities);
              } else {
                imageEntities.push(imageEntity);
              }
            }
          }

        }, (err) => {
          console.log(err);
        });

      });

      return imageEntities;

    });

  }



}
