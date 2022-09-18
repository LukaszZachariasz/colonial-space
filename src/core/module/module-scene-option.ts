import * as BABYLON from 'babylonjs';
import {Type} from '@colonial-space/core/type';

export interface ModuleSceneOption {
    name: string;
    cameraFactory: (scene: BABYLON.Scene) => BABYLON.Camera;
    root?: boolean;
    lazy?: boolean;

    scene: Type<unknown>;
    gui: Type<unknown>;
    arrangement?: Type<unknown>[];
    providers?: Type<unknown>[];
}
