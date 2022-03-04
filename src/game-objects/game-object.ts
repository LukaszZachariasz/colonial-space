import * as BABYLON from 'babylonjs';

export interface GameObject {
    create(scene: BABYLON.Scene): void;
}