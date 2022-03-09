import {GameScene} from './game-scene';
import {v4 as uuidv4} from 'uuid';
import loadingScreenManager from '../engine/loading-scene-manager/loading-scene-manager';

export abstract class GameSceneLoading extends GameScene {
    public name = 'Game scene Loading';

    private readonly uuid: string = uuidv4();

    constructor() {
        super();
        loadingScreenManager.startLoading(this.uuid);

        this.scene.executeWhenReady(() => {
            loadingScreenManager.stopLoading(this.uuid);
        });
    }
}