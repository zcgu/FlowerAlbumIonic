export class ImageEntity {
    constructor(public id: string,
        public thumbnailUrl: string,
        public mediumSizeUrl: string,
        public fullSizeUrl: string,
        public isFile: boolean,
        public path: string) {
    }
}
