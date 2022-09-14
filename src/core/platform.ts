import * as BABYLON from 'babylonjs';
import {CANVAS_ELEMENT} from '@colonial-space/core/canvas-element/canvas-element';
import {ENGINE} from '@colonial-space/core/engine/engine';
import {Injector} from '@colonial-space/core/injector/injector';
import {Type} from './type';

export class Platform {
    public static bootstrap<M>(module: Type<M>, canvasElementId: string): void {
        const canvasElement = document.getElementById(canvasElementId) as HTMLCanvasElement;
        
        Injector.set(CANVAS_ELEMENT, canvasElement);
        Injector.set(ENGINE, new BABYLON.Engine(canvasElement, true));
    }
}
