import {Injectable} from '@angular/core';
import {NavController, Storage, SqlStorage, Loading, Alert, Modal} from 'ionic-angular';
import {ImageEntity} from './image-entity';

@Injectable()
export class DBManager {
  private db: any;

  constructor() {
    this.db = new Storage(SqlStorage);
    this.db.query('create table if not exists ' + TABLE_NAME
      + ' (' + ID + ' integer primary key autoincrement, '
      + URL + ' text, '
      + CHINESE_NAME + ' text, '
      + OTHER_NAME + ' text, '
      + KE + ' text, '
      + SHU + ' text, '
      + LATIN_NAME + ' text, '
      + TIME + ' text, '
      + PLACE + ' text'
      + ')');
    this.db.query('create index if not exists ' + URL_INDEX + ' on ' + TABLE_NAME + ' (' + URL + ')');
  }

  log() {
      this.db.query('select * from ' + TABLE_NAME).then((res) => {
        console.log('log: ', res);
      });
 
  }

  insert(url: string): Promise<any> {
    return this.db.query('insert into ' + TABLE_NAME + ' values(null, "' + url + '", "照片", "无", "无", "无", "无", "无", "无")');
  }

  update(id: number, value: string, col: string): Promise<any> {
    return this.db.query('update ' + TABLE_NAME + ' set ' + col + ' = ' + value + ' where ' + ID + ' = ' + id);
  }

  get(url: string, isFile: boolean): ImageEntity {
    return this.db.query('select * from ' + TABLE_NAME + ' where ' + URL + ' = "' + url + '"').then((res) => {
    // return this.db.query('select * from ' + TABLE_NAME).then((res) => {
      console.log('query result: ', res);
      console.log('query result: ', res[0]);
      return new ImageEntity(7, isFile, '1', '1', '1', '1', '1', '1', '1', '1' );
    }, (error) => {
      console.log('error: ' + error);
    });
  }
}

const TABLE_NAME = 'images';
const ID = 'id';
const URL = 'url';
const CHINESE_NAME = 'chinesename';
const OTHER_NAME = 'othername';
const KE = 'ke'
const SHU = 'shu';
const LATIN_NAME = 'latinname';
const TIME = 'time';
const PLACE = 'place';

const URL_INDEX = 'urlindex';