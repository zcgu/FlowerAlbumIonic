export class ImageEntity {
  public name: string;
  public image: string;

  constructor(public id: number,
    public isFile: boolean,
    public url: string,
    private chinesename: string,
    public othername: string,
    public ke: string,
    public shu: string,
    public latin: string,
    public time: string,
    public place: string
    ) {
    // name.
    if (!isFile) {
      var path2: string;
      if (url.charAt(url.length - 1) == '/') {
        path2 = url.substring(0, url.length - 1);
      } else {
        path2 = url;
      }
      var index = path2.lastIndexOf('/');
      this.name = path2.substring(index + 1);
      this.name = this.decode_utf8(this.name);
    } else {
      this.name = chinesename;
    }

    // image.
    if (isFile) {
      this.image = url;
    } else {
      this.image = FOLDER_IMAGE_PATH;
    }
  }

  // encode_utf8(s) {
  //   return unencodeURI(encodeURIComponent(s));
  // }

  decode_utf8(s) {
    return decodeURIComponent(s);
  }
}


const FOLDER_IMAGE_PATH = "img/folder.png";