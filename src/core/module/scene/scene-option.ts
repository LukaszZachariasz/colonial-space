import * as BABYLON from 'babylonjs';
import {SceneDefinition} from '@colonial-space/core/module/scene/scene-definition';

/**
 * RegisteredScene option definition.
 */
export interface SceneOption {
    /**
     * RegisteredScene route name. Use it to navigate to proper scene.
     */
    name: string;
    /**
     * RegisteredScene main class.
     */
    scene: SceneDefinition;
    /**
     * Function should return BABYLON camera.
     */
    cameraFactory: (scene: BABYLON.Scene) => BABYLON.Camera;
    /**
     * Set true if it's main scene.
     * That will auto navigate to it.
     */
    root?: boolean;
}
