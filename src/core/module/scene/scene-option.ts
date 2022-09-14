import * as BABYLON from 'babylonjs';
import {GuiDefinition} from '@colonial-space/core/module/scene/gui-definition';
import {SceneDefinition} from '@colonial-space/core/module/scene/scene-definition';

export interface SceneOption {
    name: string;
    scene: SceneDefinition;
    cameraFactory: (scene: BABYLON.Scene) => BABYLON.Camera;

    gui: GuiDefinition;
    root?: boolean;
    components?: unknown[];
}
