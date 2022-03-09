import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {GameSceneGui} from '../../game-scene-gui';

export class GalaxySceneGui implements GameSceneGui {
    public advancedTexture: GUI.AdvancedDynamicTexture;
    private button: GUI.Button;

    public create(scene: BABYLON.Scene): void {
        /*this.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('galaxySceneGui', true, scene);

        this.button = GUI.Button.CreateSimpleButton('planetView', 'Planet view');
        this.button.width = '100px';
        this.button.height = '50px';
        this.button.color = 'white';
        this.button.top = '5px';
        this.button.left = '5px';
        this.button.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.button.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;*/

/*        this.button.onPointerUpObservable.add(() => {
            sceneLoader.setScenes(gameStage.currentScenario.planetScene);
        });*/

        // this.advancedTexture.addControl(this.button);
    }

    public dispose(): void {
        // this.advancedTexture.dispose();
    }
}