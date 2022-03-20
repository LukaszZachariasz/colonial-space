import * as BABYLON from 'babylonjs';
import {Gui} from './gui';
import {gameEngine, gamePlatform} from '../../core/game-platform';

export abstract class Scene<T extends BABYLON.Camera = BABYLON.Camera, Q extends Gui = Gui> {
    public abstract name: string;

    public scene: BABYLON.Scene = new BABYLON.Scene(gameEngine().engine);
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