import * as BABYLON from 'babylonjs';

export abstract class Model {
    public abstract create(scene: BABYLON.Scene): void;
}
