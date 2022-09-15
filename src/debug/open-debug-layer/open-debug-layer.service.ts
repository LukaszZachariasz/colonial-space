import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SceneRouter} from '@colonial-space/core/scene-manager/router/scene-router';
import {ipcRenderer} from 'electron';

@Injectable()
export class OpenDebugLayerService implements OnInit {
    @Inject(SceneRouter) private sceneRouter: SceneRouter;

    public gameOnInit(): void {
        ipcRenderer.on('open-debug-layer', () => {
            this.sceneRouter.activeScene.scene.debugLayer.show({
                showInspector: true,
                overlay: true
            });
        });
    }
}
