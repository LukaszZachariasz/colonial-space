import {CANVAS_ELEMENT} from '@colonial-space/core/canvas-element/canvas-element';
import {Injector} from '@colonial-space/core/injector/injector';
import {Type} from './type';

export class Platform {
    public static bootstrap<M>(module: Type<M>, canvasElementId: string): void {
        Injector.set(CANVAS_ELEMENT, document.getElementById(canvasElementId));
    }
}
