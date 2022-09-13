import * as BABYLON from 'babylonjs';
import {Container} from 'typedi';
import {Engine} from 'engine';

export abstract class Scene<T extends BABYLON.Camera = BABYLON.Camera, Q = {}> {
    public scene: BABYLON.Scene = new BABYLON.Scene(Container.get(Engine).engine);

    public name: string;
    public abstract camera: T;
    public abstract gui: Q;
}
