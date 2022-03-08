import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';

export interface GameObjectGui {
    container: GUI.Container;
    create(scene: BABYLON.Scene): GUI.Container;
}