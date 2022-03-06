import * as BABYLON from 'babylonjs';
import {GameScene} from '../game-scene';
import {SpaceSkybox} from '../../game-objects/skybox/space-skybox/space-skybox';

export class GalaxyScene extends GameScene {
    public camera: BABYLON.FreeCamera;
    public skybox: SpaceSkybox;
}