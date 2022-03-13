import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {gamePlatform} from '../core/game-platform';

export abstract class GuiObject {
    protected scene: BABYLON.Scene = gamePlatform().engine.sceneManager.currentScene.scene;

    public abstract render(): GUI.Control;
}
