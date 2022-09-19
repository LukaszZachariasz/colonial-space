import * as BABYLON from 'babylonjs';
import {ENGINE} from '@colonial-space/core/engine.token';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {SceneRouter} from '@colonial-space/core/module/scene/scene-router';

@Injectable({
    providedIn: 'root'
})
export class RenderLoop {
    @Inject(ENGINE) private engine: BABYLON.Engine;
    @Inject(SceneRouter) private sceneRouter: SceneRouter;
    
    public run(): void {
        this.engine.runRenderLoop(() => {
            this.sceneRouter.activeScene?.scene.render();
        });

        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }
}
