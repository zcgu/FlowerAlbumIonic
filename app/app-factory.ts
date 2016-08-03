/* Utils */
import {ViewPortUtil} from './utils/viewport-util';
import {ImageLoader} from './utils/image-loader-util'

import {DragGestureRecognizerProvider} from './utils/gestures/drag-gesture-recognizer-provider';

import {PhotoViewerController} from './pages/viewer/photo-viewer-view-controller';

import {DBManager} from './utils/db-manager'

export const APP_PROVIDERS = [
  /* Utils */
  ViewPortUtil,
  ImageLoader,
  DBManager,

  /* Gesture Recognizers */
  DragGestureRecognizerProvider,

  /* Controllers */
  PhotoViewerController
];
