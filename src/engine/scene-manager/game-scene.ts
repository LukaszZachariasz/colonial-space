import {GameSceneConfig} from './game-scene-config';
import {gamePlatform} from '../../core/game-platform';

export function GameScene(gameSceneConfig: GameSceneConfig): any {
    return function (constructor: any): any {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);
                setInitialConfig(this, gameSceneConfig);
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
