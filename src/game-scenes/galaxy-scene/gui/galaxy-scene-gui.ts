import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {GalaxyNameLabel} from './galaxy-name-label/galaxy-name-label';
import {GalaxyOriginContent} from './galaxy-origin-content/galaxy-origin-content';
import {GalaxyScene} from '../galaxy-scene';
import {GameSceneGui} from '../../game-scene-gui';

export class GalaxySceneGui implements GameSceneGui {
    public advancedTexture: GUI.AdvancedDynamicTexture;
    public galaxyNameLabel: GalaxyNameLabel;
    public galaxyOriginContent: GalaxyOriginContent;

    constructor(public galaxyScene: GalaxyScene) {
    }

    public create(scene: BABYLON.Scene): void {
        this.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('galaxySceneGui', true, scene);

        this.galaxyNameLabel = new GalaxyNameLabel();
        this.galaxyNameLabel.label = this.galaxyScene.name;
        this.galaxyNameLabel.create();

        this.galaxyOriginContent = new GalaxyOriginContent(this.galaxyScene.galaxyOrigin);
        this.galaxyOriginContent.advanceTexture = this.advancedTexture;

        this.advancedTexture.addControl(this.galaxyNameLabel.text);
    }

    public dispose(): void {
        this.advancedTexture.dispose();
    }
}