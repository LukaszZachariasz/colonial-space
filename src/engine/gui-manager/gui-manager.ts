import * as GUI from 'babylonjs-gui';
import {Control} from './control';
import {sceneManager} from 'engine';

export class GuiManager {
    public advancedDynamicTexture: GUI.AdvancedDynamicTexture;

    public reset(): void {
        if (this.advancedDynamicTexture) {
            this.advancedDynamicTexture.dispose();
        }

        const currentScene = sceneManager().currentScene;

        this.advancedDynamicTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('GUI', true, currentScene.scene);
        currentScene.gui.render();
    }

    public appendToRoot<T extends Control<GUI.Control>>(gameObjectGui: T): T {
        gameObjectGui.create();
        this.advancedDynamicTexture.addControl(gameObjectGui.control);
        return gameObjectGui;
    }
}
