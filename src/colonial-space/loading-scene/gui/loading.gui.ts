import * as BABYLON from 'babylonjs';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {SCENE} from '@colonial-space/core/module/scene/scene.token';
import {SceneGuiManager} from '@colonial-space/core/module/scene/gui/scene-gui-manager';
import {TextGuiElement} from '../../game/space-scene/gui/shared/text/text.gui-element';

export class LoadingGui implements OnLoad {
    @Inject(SceneGuiManager) private guiManagerService: SceneGuiManager;
    @Inject(SCENE) private scene: BABYLON.Scene;
    
    public gameOnLoad(): void {
        this.guiManagerService.appendToRoot(new TextGuiElement('Loading...'));
    }
}
