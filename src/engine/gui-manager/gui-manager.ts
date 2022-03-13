import * as GUI from 'babylonjs-gui';
import {GameObjectGui} from '../../game-objects-gui/game-object-gui';
import {gamePlatform} from '../../core/game-platform';

export class GuiManager {
    public advancedDynamicTexture: GUI.AdvancedDynamicTexture;

    public reset(): void {
        if (this.advancedDynamicTexture) {
            this.advancedDynamicTexture.dispose();
        }

        this.advancedDynamicTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('loadingGUI', true, gamePlatform().engine.sceneManager.currentScene.scene);
        gamePlatform().engine.sceneManager.currentScene.gui.render();
    }

    public render<T extends GameObjectGui>(gameObjectGui: T, container?: GUI.Container): T {
        if (container) {
            container.addControl(gameObjectGui.create(gamePlatform().engine.sceneManager.currentScene.scene));
        } else {
            this.advancedDynamicTexture.addControl(gameObjectGui.create(gamePlatform().engine.sceneManager.currentScene.scene));
        }
        return gameObjectGui;
    }
}
