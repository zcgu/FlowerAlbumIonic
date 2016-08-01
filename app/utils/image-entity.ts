export class ImageEntity {
  public name: string;

  constructor(public id: string,
    public thumbnailUrl: string,
    public mediumSizeUrl: string,
    public fullSizeUrl: string,
    public isFile: boolean,
    public path: string) {

    // name
    if (!isFile) {
      var path2: string;
      if (path.charAt(path.length - 1) == '/') {
        path2 = path.substring(0, path.length - 1);
      } else {
        path2 = path;
      }
      var index = path2.lastIndexOf('/');
      this.name = path2.substring(index + 1);
      this.name = this.decode_utf8(this.name);
    } else {
      this.name = "Photo";
    }
    console.log(path);

  }
// encode_utf8(s) {
//   return unencodeURI(encodeURIComponent(s));
// }

  decode_utf8(s) {
    return decodeURIComponent(encodeURI(s));
  }
}
