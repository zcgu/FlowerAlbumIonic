import {ElementRef, EventEmitter} from '@angular/core';
import * as hammer from 'hammerjs';

import {GestureRecognizer} from './gesture-recognizer';

const DEFAULT_TIME: number = 251;
const DEFAULT_THRESHOLD: number = 9;

export class PressGestureRecognizer extends GestureRecognizer {

  onPress: EventEmitter<HammerInput>;
  onPressUp: EventEmitter<HammerInput>;

  constructor(elementRef: ElementRef, options: PressGestureRecognizerOptions) {
    options.time = options.time ? options.time : DEFAULT_TIME;
    options.threshold = options.threshold ? options.threshold : DEFAULT_THRESHOLD;
    super(elementRef, new hammer.Press(options));
    this.onPress = new EventEmitter();
    this.onPressUp = new EventEmitter();
  }

  listen() {
    super.listen();
    this._hammerManager.on('press', this._onPress);
    this._hammerManager.on('pressup', this._onPressUp);
  }

  unlisten() {
    this._hammerManager.off('press', this._onPress);
    this._hammerManager.off('pressup', this._onPressUp);
    super.unlisten();
  }

  _onPress(event: HammerInput): void {
    this.onPress.emit(event);
  }

  _onPressUp(event: HammerInput): void {
    this.onPressUp.emit(event);
  }
}

export interface PressGestureRecognizerOptions {
  threshold?: number;
  time?: number;
};
