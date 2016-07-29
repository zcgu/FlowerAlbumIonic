import {ElementRef, EventEmitter} from '@angular/core';
import * as hammer from 'hammerjs';

import {GestureRecognizer} from './gesture-recognizer';

const DEFAULT_NUM_POINTERS: number = 2;
const DEFAULT_THRESHOLD: number = 0;

export class RotateGestureRecognizer extends GestureRecognizer {

  onRotateStart: EventEmitter<HammerInput>;
  onRotateMove: EventEmitter<HammerInput>;
  onRotateEnd: EventEmitter<HammerInput>;

  constructor(elementRef: ElementRef, options: RotateGestureRecognizerOptions) {
    options.pointers = options.pointers && options.pointers >= 2 ? options.pointers : DEFAULT_NUM_POINTERS;
    options.threshold = options.threshold ? options.threshold : DEFAULT_THRESHOLD;
    super(elementRef, new hammer.Rotate(options));
    this.onRotateStart = new EventEmitter();
    this.onRotateMove = new EventEmitter();
    this.onRotateEnd = new EventEmitter();
  }

  listen() {
    super.listen();
    this._hammerManager.on('rotatestart', this._onRotateStart);
    this._hammerManager.on('rotatemove', this._onRotateMove);
    this._hammerManager.on('rotateend', this._onRotateEnd);
  }

  unlisten() {
    this._hammerManager.off('rotatestart', this._onRotateStart);
    this._hammerManager.off('rotatemove', this._onRotateMove);
    this._hammerManager.off('rotateend', this._onRotateEnd);
    super.unlisten();
  }

  _onRotateStart(event: HammerInput): void {
    this.onRotateStart.emit(event);
  }

  _onRotateMove(event: HammerInput): void {
    this.onRotateMove.emit(event);
  }

  _onRotateEnd(event: HammerInput): void {
    this.onRotateEnd.emit(event);
  }
}

export interface RotateGestureRecognizerOptions {
  threshold?: number;
  pointers?: number;
};
