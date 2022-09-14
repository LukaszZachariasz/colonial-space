import {Injector} from '@colonial-space/core/injector/injector';
import {GameSceneConfig} from './game-scene-config';
import {LoadingManagerService} from '../loading-manager/loading-manager.service';
import {SceneManagerService} from './scene-manager.service';
import {ipcRenderer} from 'electron';

export function GameScene(gameSceneConfig: GameSceneConfig): any {
    return function (constructor: any): any {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);
                setInitialConfig(this, gameSceneConfig);
                if (gameSceneConfig.preload) {
                    Injector.inject(SceneManagerService).preloadingScenes.add(this as any);
                    this.scene.onReadyObservable.add(() => {
                        Injector.inject(SceneManagerService).preloadingScenes.delete(this as any);
                        if (Injector.inject(SceneManagerService).preloadingScenes.size === 0) {
                            ipcRenderer.send('game-engine-ready');
                        }
                    });
                    setTimeout(() => {
                        this.scene.render();
                    });
                }
            }
        };
    };
}

function setInitialConfig(scene: any, config: GameSceneConfig): void {
    scene.name = config.name;
    scene.scene.detachControl();
    if (config.registerInLoadingManager) {
        Injector.inject(LoadingManagerService).start(scene.scene.uid);

        scene.scene.executeWhenReady(() => {
            Injector.inject(LoadingManagerService).stop(scene.scene.uid);
        });
    }
}
