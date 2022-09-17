import * as BABYLON from 'babylonjs';
import {ArrangementDefinition} from '@colonial-space/core/module/scene/definitions/arrangement-definition';
import {GuiDefinition} from '@colonial-space/core/module/scene/definitions/gui-definition';
import {ProviderDefinition} from '@colonial-space/core/module/scene/definitions/provider-definition';
import {SceneDefinition} from '@colonial-space/core/module/scene/definitions/scene-definition';

export interface RegisteredScene {
    name: string;
    scene: BABYLON.Scene;
    camera: BABYLON.Camera;
    initialized: boolean;

    sceneDefinition: SceneDefinition;
    guiDefinition: GuiDefinition;
    arrangementDefinitions: ArrangementDefinition[];
    providerDefinitions: ProviderDefinition[];
}
