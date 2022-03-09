import * as BABYLON from 'babylonjs';

export interface GameObjectGui {
    create(scene?: BABYLON.Scene): void;
}