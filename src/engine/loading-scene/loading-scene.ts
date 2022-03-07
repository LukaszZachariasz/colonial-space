import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import engine from 'engine';

export class LoadingScene {
    public scene: BABYLON.Scene;

    private readonly advancedTexture: GUI.AdvancedDynamicTexture;
    private readonly text: GUI.TextBlock;
    private readonly camera: BABYLON.FreeCamera;

    constructor() {
        this.scene = new BABYLON.Scene(engine.engine);
        this.camera = new BABYLON.FreeCamera('loadingCamera', new BABYLON.Vector3(0, 0, 0), this.scene);
        this.advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('loadingGUI', true, this.scene);
        this.text = new GUI.TextBlock('loading', 'Loading...');
        this.text.color = 'white';
        this.advancedTexture.addControl(this.text);
    }
}
