import * as BABYLON from 'babylonjs';
import {ModelManager} from '@colonial-space/core/module/scene/model/model-manager';
import {SceneObject} from '@colonial-space/core/module/scene/scene-object';
import {Type} from '@colonial-space/core/type';

export class RegisteredScene {
    public name: string;
    public scene: BABYLON.Scene;
    public camera: BABYLON.Camera;
    public initialized: boolean;
    
    public modelManager: ModelManager;
    public gui: Type<unknown>;

    public sceneDefinition: SceneObject;
    public arrangementDefinitions: SceneObject[];
    public providerDefinitions: SceneObject[];
}
