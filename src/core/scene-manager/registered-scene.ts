import * as BABYLON from 'babylonjs';
import {ComponentDefinition} from '@colonial-space/core/module/scene/definitions/component-definition';
import {GuiDefinition} from '@colonial-space/core/module/scene/definitions/gui-definition';
import {SceneDefinition} from '@colonial-space/core/module/scene/definitions/scene-definition';

export interface RegisteredScene {
    name: string;
    scene: BABYLON.Scene;
    camera: BABYLON.Camera;

    sceneDefinition: SceneDefinition;
    guiDefinition: GuiDefinition;
    componentDefinitions: ComponentDefinition[];
}
