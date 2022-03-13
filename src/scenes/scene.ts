import * as BABYLON from 'babylonjs';
import {SceneGui} from './scene-gui';
import {gamePlatform} from '../core/game-platform';
import engine from 'engine';

export abstract class Scene<T extends BABYLON.Camera = BABYLON.Camera, Q extends SceneGui = SceneGui> {
    public name: string;
    public scene: BABYLON.Scene = new BABYLON.Scene(engine.engine);
    public camera: T;
    public gui: Q;

    protected constructor(registerInLoadingManager: boolean) {
        this.scene.detachControl();

        if (registerInLoadingManager) {
            gamePlatform().loadingManager.start(this.scene.uid);

            this.scene.executeWhenReady(() => {
                gamePlatform().loadingManager.stop(this.scene.uid);
            });
        }
    }
}