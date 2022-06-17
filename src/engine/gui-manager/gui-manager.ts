import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {GuiControl} from './gui-elements/gui-control';
import {isAfterCreated} from '../lifecycle/after-created/is-after-created';
import {isOnDestroy} from '../lifecycle/on-destroy/is-on-destroy';
import {isOnReady} from '../lifecycle/on-ready/is-on-ready';
import {sceneManager} from 'engine';

export class GuiManager {
    public advancedDynamicTexture: GUI.AdvancedDynamicTexture;

    public createGui(): void {
        const currentScene = sceneManager().currentScene;
        this.advancedDynamicTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('GUI', true, currentScene.scene);
        isAfterCreated(currentScene.gui) && currentScene.gui.gameAfterCreated();
        isOnReady(currentScene.gui) && currentScene.gui.gameOnReady();
    }

    public disposeGui(): void {
        if (this.advancedDynamicTexture) {
            this.advancedDynamicTexture.dispose();
        }
        const currentScene = sceneManager().currentScene;
        isOnDestroy(currentScene?.gui) && currentScene.gui.gameOnDestroy();
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
