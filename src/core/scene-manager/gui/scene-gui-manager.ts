import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {RegisteredScene} from '@colonial-space/core/scene-manager/registered-scene';
import {isOnDestroy} from '@colonial-space/core/lifecycle/on-destroy/is-on-destroy';
import {isOnLoad} from '@colonial-space/core/lifecycle/on-load/is-on-load';

@Injectable()
export class SceneGuiManager {
    public advancedDynamicTexture: GUI.AdvancedDynamicTexture;

    public createGuiScene(scene: RegisteredScene): void {
        this.advancedDynamicTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('GUI', true, scene.scene);
        isOnLoad(scene.guiDefinition) && scene.guiDefinition.gameOnLoad();
    }

    public disposeGuiScene(scene: RegisteredScene): void {
        if (this.advancedDynamicTexture) {
            this.advancedDynamicTexture.dispose();
        }
        isOnDestroy(scene?.guiDefinition) && scene.guiDefinition.gameOnDestroy();
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
