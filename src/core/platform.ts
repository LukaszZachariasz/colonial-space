import * as BABYLON from 'babylonjs';
import {CANVAS_ELEMENT} from '@colonial-space/core/injector/tokens/canvas-element/canvas-element.token';
import {ENGINE} from '@colonial-space/core/injector/tokens/engine/engine.token';
import {Injector} from '@colonial-space/core/injector/injector';
import {RenderLoop} from '@colonial-space/core/render-loop/render-loop';
import {SceneManager} from '@colonial-space/core/scene-manager/scene-manager';
import {Type} from './type';

export class Platform {
    public static renderLoop = new RenderLoop();
    
    public static bootstrap<M>(module: Type<M>, canvasElementId: string): void {
        const canvasElement = document.getElementById(canvasElementId) as HTMLCanvasElement;
        
        Injector.set(CANVAS_ELEMENT, canvasElement);
        Injector.set(ENGINE, new BABYLON.Engine(canvasElement, true));
        Injector.set(SceneManager.name, new SceneManager());

        this.renderLoop.run();
    }
}
