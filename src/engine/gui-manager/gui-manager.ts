import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {GameObjectGui} from '../../game-objects-gui/game-object-gui';

export class GuiManager {
    public advancedDynamicTexture: GUI.AdvancedDynamicTexture;

    private scene: BABYLON.Scene;

    public reset(scene: BABYLON.Scene): void {
        this.scene = scene;
        if (this.advancedDynamicTexture) {
            this.advancedDynamicTexture.dispose();
        }

        this.advancedDynamicTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('loadingGUI', true, this.scene);
    }

    public create<T extends GameObjectGui>(gameObjectGui: T, container?: GUI.Container): T {
        if (container) {
            container.addControl(gameObjectGui.create(this.scene));
        } else {
            this.advancedDynamicTexture.addControl(gameObjectGui.create(this.scene));
        }
        return gameObjectGui;
    }
}
