import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {GuiControl} from '@colonial-space/core/module/scene/gui/gui-elements/gui-control';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {Lifecycle} from '@colonial-space/core/lifecycle/lifecycle';
import {RegisteredScene} from '@colonial-space/core/module/scene/registered-scene';
import {SceneObject} from '@colonial-space/core/module/scene/scene-object';

@Injectable({
    providedIn: 'root'
})
export class SceneGuiManager {
    public advancedDynamicTexture: GUI.AdvancedDynamicTexture;

    public createGuiScene(registeredScene: RegisteredScene): void {
        this.advancedDynamicTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('GUI', true, registeredScene.scene);
        const gui = new registeredScene.gui() as SceneObject;
        gui._sceneUid = registeredScene.scene.uid;
        Lifecycle.onInit(gui);
        Lifecycle.onLoad(gui);
    }

    public disposeGuiScene(scene: RegisteredScene): void {
        if (this.advancedDynamicTexture) {
            this.advancedDynamicTexture.dispose();
        }
        Lifecycle.onUnload(scene?.gui);
        Lifecycle.onDestroy(scene?.gui);
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
