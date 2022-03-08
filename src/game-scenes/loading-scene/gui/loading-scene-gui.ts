import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {GameSceneGui} from '../../game-scene-gui';

export class LoadingSceneGui implements GameSceneGui {
    public advancedTexture: GUI.AdvancedDynamicTexture;

    private text: GUI.TextBlock;

    public create(scene: BABYLON.Scene): void {
        this.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('loadingGUI', true, scene);
        this.text = new GUI.TextBlock('loading', 'Loading...');
        this.text.color = 'white';
        this.advancedTexture.addControl(this.text);
    }

    public dispose(): void {
        this.advancedTexture.dispose();
    }

}