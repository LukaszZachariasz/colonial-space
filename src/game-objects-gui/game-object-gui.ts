import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';

export interface GameObjectGui {
    create(scene?: BABYLON.Scene): GUI.Control;
}