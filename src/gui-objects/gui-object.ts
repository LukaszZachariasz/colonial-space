import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {sceneManager} from '../core/game-platform';

export abstract class GuiObject {
    protected scene: BABYLON.Scene = sceneManager().currentScene.scene;

    public abstract render(): GUI.Control;
}
