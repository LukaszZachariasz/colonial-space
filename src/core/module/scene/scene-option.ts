import * as BABYLON from 'babylonjs';
import {ArrangementDefinition} from '@colonial-space/core/module/scene/definitions/arrangement-definition';
import {GuiDefinition} from '@colonial-space/core/module/scene/definitions/gui-definition';
import {ProviderDefinition} from '@colonial-space/core/module/scene/definitions/provider-definition';
import {SceneDefinition} from '@colonial-space/core/module/scene/definitions/scene-definition';

export interface SceneOption {
    name: string;
    cameraFactory: (scene: BABYLON.Scene) => BABYLON.Camera;
    root?: boolean;
    lazy?: boolean;

    scene: SceneDefinition;
    gui: GuiDefinition;
    arrangement?: ArrangementDefinition[];
    providers?: ProviderDefinition[];
}
