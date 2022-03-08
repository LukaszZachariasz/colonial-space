import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {CurrentTourBar} from '../../../game-objects-gui/current-tour-bar/current-tour-bar';
import {GameSceneGui} from '../../game-scene-gui';
import {ResourceBar} from '../../../game-objects-gui/resource-bar/resource-bar';

export class SectorSceneGui implements GameSceneGui {
    public advancedTexture: GUI.AdvancedDynamicTexture;
    public currentTourBar: CurrentTourBar;
    public resourceBar: ResourceBar;

    public create(scene: BABYLON.Scene): void {
        this.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('planetSceneGui', true, scene);

        this.currentTourBar = new CurrentTourBar();
        this.resourceBar = new ResourceBar();

        this.advancedTexture.addControl(this.currentTourBar.create(scene));
        this.advancedTexture.addControl(this.resourceBar.create(scene));
    }

    public dispose(): void {
        this.advancedTexture.dispose();
    }
}