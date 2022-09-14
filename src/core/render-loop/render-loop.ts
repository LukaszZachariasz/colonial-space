import * as BABYLON from 'babylonjs';
import {ENGINE} from '@colonial-space/core/injector/tokens/engine/engine.token';
import {Inject} from '@colonial-space/core/injector/inject';
import {SceneManager} from '@colonial-space/core/scene-manager/scene-manager';

export class RenderLoop {
    @Inject(ENGINE) private engine: BABYLON.Engine;
    @Inject(SceneManager) private sceneManager: SceneManager;
    
    public run(): void {
        this.engine.runRenderLoop(() => {
            this.sceneManager.currentSceneRoute?.scene.render();
        });

        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }
}
