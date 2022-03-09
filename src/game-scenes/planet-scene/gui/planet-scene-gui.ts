import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {GameScene} from '../../game-scene';
import {GameSceneGui} from '../../game-scene-gui';
import gameState from '../../../game-core/game-state/game-state';
import sceneLoader from '../../../engine/scene-loader/scene-loader';

export class PlanetSceneGui implements GameSceneGui {
    public advancedTexture: GUI.AdvancedDynamicTexture;
    private button: GUI.Button;

    public create(scene: BABYLON.Scene): void {
        this.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('planetSceneGui', true, scene);

        this.button = GUI.Button.CreateSimpleButton('galaxyView', 'Galaxy view');
        this.button.width = '100px';
        this.button.height = '50px';
        this.button.color = 'white';
        this.button.top = '5px';
        this.button.left = '5px';
        this.button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.button.onPointerUpObservable.add(() => {
            sceneLoader.setScenes(gameState.gameScenes.find((el: GameScene) => el.name === gameState.gameplayState.galaxyState.name));
        });

        this.advancedTexture.addControl(this.button);
    }

    public dispose(): void {
        this.advancedTexture.dispose();
    }
}