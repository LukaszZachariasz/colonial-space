import * as BABYLON from 'babylonjs';
import {GameSceneGui} from '../game-scene-gui';
import {LoadingSceneGui} from './gui/loading-scene-gui';
import engine from 'engine';

export class LoadingScene {
    public name = 'LoadingScene';
    public scene: BABYLON.Scene = new BABYLON.Scene(engine.engine);
    public camera: BABYLON.FreeCamera;
    public gui: GameSceneGui;

    constructor() {
        this.scene = new BABYLON.Scene(engine.engine);
        this.camera = new BABYLON.FreeCamera('loadingSceneCamera', new BABYLON.Vector3(0, 0, 0), this.scene);
        this.gui = new LoadingSceneGui();
    }
}
