import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';

export interface GameSceneGui {
    advancedTexture: GUI.AdvancedDynamicTexture;
    create(scene: BABYLON.Scene): void;
    dispose(): void;
}