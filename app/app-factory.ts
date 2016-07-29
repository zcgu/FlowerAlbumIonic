/* Utils */
import {UnsplashItUtil} from './utils/unsplash-it-util';
import {ViewPortUtil} from './utils/viewport-util';
import {ImageLoader} from './utils/image-loader-util'

import {DragGestureRecognizerProvider} from './utils/gestures/drag-gesture-recognizer-provider';

import {PhotoViewerController} from './pages/viewer/photo-viewer-view-controller';

export const APP_PROVIDERS = [
  /* Utils */
  UnsplashItUtil,
  ViewPortUtil,
  ImageLoader,
  /* Gesture Recognizers */
  DragGestureRecognizerProvider,

  /* Controllers */
  PhotoViewerController
];
