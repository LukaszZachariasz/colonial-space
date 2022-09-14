import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {OnReady} from '@colonial-space/core/lifecycle/on-ready/on-ready';
import {SceneManagerService} from '../../core/scene-manager/scene-manager.service';
import {ipcRenderer} from 'electron';

@Injectable()
export class OpenDebugLayerService implements OnReady {
    @Inject(SceneManagerService) private sceneManagerService: SceneManagerService;

    public gameOnReady(): void {
        ipcRenderer.on('open-debug-layer', () => {
            this.sceneManagerService.currentBabylonScene.debugLayer.show({
                showInspector: true,
                overlay: true
            });
        });
    }
}
