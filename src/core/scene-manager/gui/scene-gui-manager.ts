import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {GuiControl} from '@colonial-space/core/scene-manager/gui/gui-elements/gui-control';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {Lifecycle} from '@colonial-space/core/lifecycle/lifecycle';
import {RegisteredScene} from '@colonial-space/core/scene-manager/registered-scene';

@Injectable({
    providedIn: 'root'
})
export class SceneGuiManager {
    public advancedDynamicTexture: GUI.AdvancedDynamicTexture;

    public createGuiScene(scene: RegisteredScene): void {
        this.advancedDynamicTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('GUI', true, scene.scene);
        const gui = new scene.guiDefinition();
        gui._sceneUid = scene.scene.uid;
        Lifecycle.onInit(gui);
        Lifecycle.onLoad(gui);
    }

    public disposeGuiScene(scene: RegisteredScene): void {
        if (this.advancedDynamicTexture) {
            this.advancedDynamicTexture.dispose();
        }
        Lifecycle.onUnload(scene?.guiDefinition);
        Lifecycle.onDestroy(scene?.guiDefinition);
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
