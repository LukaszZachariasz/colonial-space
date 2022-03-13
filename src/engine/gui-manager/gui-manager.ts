import * as GUI from 'babylonjs-gui';
import {GuiContainer} from '../../gui-objects/gui-container';
import {gamePlatform} from '../../core/game-platform';
import {GuiObject} from '../../gui-objects/gui-object';

export class GuiManager {
    public advancedDynamicTexture: GUI.AdvancedDynamicTexture;

    public reset(): void {
        if (this.advancedDynamicTexture) {
            this.advancedDynamicTexture.dispose();
        }

        const currentScene = gamePlatform().engine.sceneManager.currentScene;

        this.advancedDynamicTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('loadingGUI', true, currentScene.scene);
        currentScene.gui.render();
    }

    public render<T extends GuiObject>(gameObjectGui: T, container?: GUI.Container): T {
        if (container) {
            container.addControl(gameObjectGui.render());
        } else {
            this.advancedDynamicTexture.addControl(gameObjectGui.render());
        }
        return gameObjectGui;
    }
}
