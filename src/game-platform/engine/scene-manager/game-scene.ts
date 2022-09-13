import {Container} from 'typedi';
import {GameSceneConfig} from './game-scene-config';
import {LoadingManager} from '../../core/loading-manager/loading-manager';
import {ipcRenderer} from 'electron';
import {sceneManager} from 'engine';

export function GameScene(gameSceneConfig: GameSceneConfig): any {
    return function (constructor: any): any {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);
                setInitialConfig(this, gameSceneConfig);
                if (gameSceneConfig.preload) {
                    sceneManager().preloadingScenes.add(this as any);
                    this.scene.onReadyObservable.add(() => {
                        sceneManager().preloadingScenes.delete(this as any);
                        if (sceneManager().preloadingScenes.size === 0) {
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
        Container.get(LoadingManager).start(scene.scene.uid);

        scene.scene.executeWhenReady(() => {
            Container.get(LoadingManager).stop(scene.scene.uid);
        });
    }
}
