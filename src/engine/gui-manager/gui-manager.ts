import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {GuiControl} from './gui-elements/gui-control';
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

    public appendToRoot<T extends GuiControl<GUI.Control>>(control: T): T {
        this.advancedDynamicTexture.addControl(control.control);
        return control;
    }

    public createForMesh<T extends GuiControl<GUI.Control>>(name: string, mesh: BABYLON.Mesh, control: T, width?: number, height?: number): GUI.AdvancedDynamicTexture {
        const advancedDynamicTexture = GUI.AdvancedDynamicTexture.CreateForMesh(mesh, width, height);
        advancedDynamicTexture.name = name;
        advancedDynamicTexture.addControl(control.control);
        return advancedDynamicTexture;
    }
}
