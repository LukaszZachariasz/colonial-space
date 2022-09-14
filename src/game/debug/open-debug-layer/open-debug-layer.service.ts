import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SceneManager} from '@colonial-space/core/scene-manager/scene-manager';
import {ipcRenderer} from 'electron';

@Injectable()
export class OpenDebugLayerService implements OnInit {
    @Inject(SceneManager) private sceneManager: SceneManager;

    public gameOnInit(): void {
        ipcRenderer.on('open-debug-layer', () => {
            this.sceneManager.currentSceneRoute.scene.debugLayer.show({
                showInspector: true,
                overlay: true
            });
        });
    }
}
