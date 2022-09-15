import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {Injector} from '@colonial-space/core/injector/injector';
import {SceneManager} from '@colonial-space/core/scene-manager/scene-manager';
import {isOnDestroy} from '@colonial-space/core/lifecycle/on-destroy/is-on-destroy';
import {isOnLoad} from '@colonial-space/core/lifecycle/on-load/is-on-load';

export class GuiManager {
    public advancedDynamicTexture: GUI.AdvancedDynamicTexture;

    public createGuiScene(): void {
        const currentScene = Injector.inject(SceneManager).currentSceneRoute;
        this.advancedDynamicTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('GUI', true, currentScene.scene);
        isOnLoad(currentScene.guiDefinition) && currentScene.guiDefinition.gameOnLoad();
    }

    public disposeGuiScene(): void {
        if (this.advancedDynamicTexture) {
            this.advancedDynamicTexture.dispose();
        }
        const currentScene = Injector.inject(SceneManager).currentSceneRoute;
        isOnDestroy(currentScene?.guiDefinition) && currentScene.guiDefinition.gameOnDestroy();
    }

    public appendToRoot(control: any): any {
        this.advancedDynamicTexture.addControl(control.control);
        return control;
    }

    public createForMesh(name: string, mesh: BABYLON.Mesh, control: any, width?: number, height?: number): GUI.AdvancedDynamicTexture {
        const advancedDynamicTexture = GUI.AdvancedDynamicTexture.CreateForMesh(mesh, width, height);
        advancedDynamicTexture.name = name;
        advancedDynamicTexture.addControl(control.control);
        return advancedDynamicTexture;
    }
}
