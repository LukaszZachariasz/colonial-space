import * as BABYLON from 'babylonjs';
import {CANVAS_ELEMENT} from '@colonial-space/core/injector/tokens/canvas-element/canvas-element.token';
import {ENGINE} from '@colonial-space/core/injector/tokens/engine/engine.token';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injector} from '@colonial-space/core/injector/injector';
import {RenderLoop} from '@colonial-space/core/render-loop/render-loop';
import {Type} from './type';

export class Platform {
    @Inject(RenderLoop) private renderLoop: RenderLoop;
    
    public bootstrap<M>(module: Type<M>, canvasElementId: string): void {
        this.initializeEngine(document.getElementById(canvasElementId) as HTMLCanvasElement);

        this.renderLoop.run();
    }

    private initializeEngine(canvasElement: HTMLCanvasElement): void {
        Injector.set(CANVAS_ELEMENT, canvasElement);
        Injector.set(ENGINE, new BABYLON.Engine(canvasElement, true));
    }
}
