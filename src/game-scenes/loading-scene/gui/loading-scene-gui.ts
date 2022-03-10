import * as BABYLON from 'babylonjs';
import {GameSceneGui} from '../../game-scene-gui';
import {LoadingText} from './loading-text/loading-text';
import guiManager from '../../../engine/gui-manager/gui-manager';

export class LoadingSceneGui implements GameSceneGui {
    public create(scene: BABYLON.Scene): void {
        guiManager.reset(scene);

        guiManager.create(new LoadingText());
    }
}