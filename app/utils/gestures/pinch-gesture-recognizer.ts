import {ElementRef, EventEmitter} from '@angular/core';
import * as hammer from 'hammerjs';

import {GestureRecognizer} from './gesture-recognizer';

const DEFAULT_NUM_POINTERS: number = 2;
const DEFAULT_THRESHOLD: number = 0;

export class PinchGestureRecognizer extends GestureRecognizer {

  onPinchStart: EventEmitter<HammerInput>;
  onPinchIn: EventEmitter<HammerInput>;
  onPinchMove: EventEmitter<HammerInput>;
  onPinchOut: EventEmitter<HammerInput>;
  onPinchEnd: EventEmitter<HammerInput>;

  constructor(elementRef: ElementRef, options: PinchGestureRecognizerOptions) {
    options.pointers = options.pointers && options.pointers >= 2 ? options.pointers : DEFAULT_NUM_POINTERS;
    options.threshold = options.threshold ? options.threshold : DEFAULT_THRESHOLD;
    super(elementRef, new hammer.Pinch(options));
    this.onPinchStart = new EventEmitter();
    this.onPinchIn = new EventEmitter();
    this.onPinchMove = new EventEmitter();
    this.onPinchOut = new EventEmitter();
    this.onPinchEnd = new EventEmitter();
  }

  listen() {
    super.listen();
    this._hammerManager.on('pinchstart', this._onPinchStart);
    this._hammerManager.on('pinchin', this._onPinchIn);
    this._hammerManager.on('pinchmove', this._onPinchMove);
    this._hammerManager.on('pinchout', this._onPinchOut);
    this._hammerManager.on('pinchend', this._onPinchEnd);
  }

  unlisten() {
    this._hammerManager.off('pinchstart', this._onPinchStart);
    this._hammerManager.off('pinchin', this._onPinchIn);
    this._hammerManager.off('pinchmove', this._onPinchMove);
    this._hammerManager.off('pinchout', this._onPinchOut);
    this._hammerManager.off('pinchend', this._onPinchEnd);
    super.unlisten();
  }

  _onPinchStart(event: HammerInput): void {
    this.onPinchStart.emit(event);
  }

  _onPinchIn(event: HammerInput): void {
    this.onPinchIn.emit(event);
  }

  _onPinchMove(event: HammerInput): void {
    this.onPinchMove.emit(event);
  }

  _onPinchOut(event: HammerInput): void {
    this.onPinchOut.emit(event);
  }

  _onPinchEnd(event: HammerInput): void {
    this.onPinchEnd.emit(event);
  }
}

export interface PinchGestureRecognizerOptions {
  threshold?: number;
  pointers?: number;
};
