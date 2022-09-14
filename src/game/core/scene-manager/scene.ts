import * as BABYLON from 'babylonjs';
import {GameService} from '../../game.service';
import {Injector} from '@colonial-space/core/injector/injector';

export abstract class Scene<T extends BABYLON.Camera = BABYLON.Camera, Q = {}> {
    public scene: BABYLON.Scene = new BABYLON.Scene(Injector.inject(GameService).engine);

    public name: string;
    public abstract camera: T;
    public abstract gui: Q;
}
