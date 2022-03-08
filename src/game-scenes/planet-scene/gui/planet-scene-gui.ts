import * as GUI from 'babylonjs-gui';
import {GameSceneGui} from '../../game-scene-gui';
import gameStage from '../../../engine/game-stage/game-stage';
import sceneLoader from '../../../engine/scene-loader/scene-loader';

export class PlanetSceneGui implements GameSceneGui {
    public advancedTexture: GUI.AdvancedDynamicTexture;
    private button: GUI.Button;

    public create(): void {
        this.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('planetSceneGui', true);

        this.button = GUI.Button.CreateSimpleButton('galaxyView', 'Galaxy view');
        this.button.width = '100px';
        this.button.height = '50px';
        this.button.color = 'white';
        this.button.top = '5px';
        this.button.left = '5px';
        this.button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.button.onPointerUpObservable.add(() => {
            sceneLoader.setScenes(gameStage.currentScenario.galaxyScene);
        });

        this.advancedTexture.addControl(this.button);
    }

    public dispose(): void {
        this.advancedTexture.dispose();
    }
}