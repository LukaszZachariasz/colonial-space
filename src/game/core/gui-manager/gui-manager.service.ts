import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {GuiControl} from './gui-elements/gui-control';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {Injector} from '@colonial-space/core/injector/injector';
import {SceneManagerService} from '../scene-manager/scene-manager.service';
import {isAfterCreated} from '@colonial-space/core/lifecycle/after-created/is-after-created';
import {isOnDestroy} from '@colonial-space/core/lifecycle/on-destroy/is-on-destroy';
import {isOnReady} from '@colonial-space/core/lifecycle/on-ready/is-on-ready';

@Injectable()
export class GuiManagerService {
    public advancedDynamicTexture: GUI.AdvancedDynamicTexture;

    public createGuiScene(): void {
        const currentScene = Injector.inject(SceneManagerService).currentScene;
        this.advancedDynamicTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI('GUI', true, currentScene.scene);
        isAfterCreated(currentScene.gui) && currentScene.gui.gameAfterCreated();
        isOnReady(currentScene.gui) && currentScene.gui.gameOnReady();
    }

    public disposeGuiScene(): void {
        if (this.advancedDynamicTexture) {
            this.advancedDynamicTexture.dispose();
        }
        const currentScene = Injector.inject(SceneManagerService).currentScene;
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
