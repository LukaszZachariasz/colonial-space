import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {Control} from './gui-elements/control';
import {sceneManager} from 'engine';

export class GuiManager {
    public advancedDynamicTexture: GUI.AdvancedDynamicTexture;

    public createGui(): void {
        const currentScene = sceneManager().currentScene;
        this.advancedDynamicTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('GUI', true, currentScene.scene);
        currentScene.gui.onCreate();
        currentScene.gui.onRegisterListeners();
    }

    public disposeGui(): void {
        if (this.advancedDynamicTexture) {
            this.advancedDynamicTexture.dispose();
        }
        const currentScene = sceneManager().currentScene;
        currentScene?.gui?.onDestroy();
    }

    public appendToRoot<T extends Control<GUI.Control>>(control: T): T {
        control.create();
        this.advancedDynamicTexture.addControl(control.control);
        return control;
    }

    public createForMesh<T extends Control<GUI.Control>>(name: string, mesh: BABYLON.Mesh, control: T, width?: number, height?: number): GUI.AdvancedDynamicTexture {
        const advancedDynamicTexture = GUI.AdvancedDynamicTexture.CreateForMesh(mesh, width, height);
        advancedDynamicTexture.name = name;
        control.create();
        advancedDynamicTexture.addControl(control.control);
        return advancedDynamicTexture;
    }
}
