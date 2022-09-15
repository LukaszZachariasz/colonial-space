import * as BABYLON from 'babylonjs';
import {ComponentDefinition} from '@colonial-space/core/module/scene/definitions/component-definition';
import {GuiDefinition} from '@colonial-space/core/module/scene/definitions/gui-definition';
import {SceneDefinition} from '@colonial-space/core/module/scene/definitions/scene-definition';

export interface SceneOption {
    name: string;
    cameraFactory: (scene: BABYLON.Scene) => BABYLON.Camera;
    root?: boolean;
    lazy?: boolean;

    scene: SceneDefinition;
    gui: GuiDefinition;
    components?: ComponentDefinition[];
}
