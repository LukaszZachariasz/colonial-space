import * as BABYLON from 'babylonjs';

export interface RegisteredScene {
    name: string;
    scene: BABYLON.Scene;
    camera: BABYLON.Camera;

    sceneDefinition: any;
    guiDefinition: any;
    componentDefinitions: any[];
}
