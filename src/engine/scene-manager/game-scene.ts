import {GameSceneConfig} from './game-scene-config';
import {gamePlatform} from '../../core/game-platform';
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
                            console.log('test');
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
        gamePlatform().loadingManager.start(scene.scene.uid);

        scene.scene.executeWhenReady(() => {
            gamePlatform().loadingManager.stop(scene.scene.uid);
        });
    }
}
