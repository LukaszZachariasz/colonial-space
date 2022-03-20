import * as GUI from 'babylonjs-gui';
import {Control} from '../../game/scene/space/gui/control';
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

    public render<T extends Control>(gameObjectGui: T, container?: GUI.Container): T {
        if (container) {
            container.addControl(gameObjectGui.render());
        } else {
            this.advancedDynamicTexture.addControl(gameObjectGui.render());
        }
        return gameObjectGui;
    }
}
