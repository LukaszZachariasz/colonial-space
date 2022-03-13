import * as BABYLON from 'babylonjs';
import {GameSceneGui} from '../../game-scene-gui';
import {LoadingText} from './loading-text/loading-text';
import {gamePlatform} from '../../../core/game-platform';

export class LoadingSceneGui implements GameSceneGui {
    public create(scene: BABYLON.Scene): void {
        gamePlatform().engine.guiManager.reset(scene);

        gamePlatform().engine.guiManager.create(new LoadingText());
    }
}
