import * as BABYLON from 'babylonjs';

export interface GameSceneGui {
    create(scene: BABYLON.Scene): void;
}