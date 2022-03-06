import * as BABYLON from 'babylonjs';
import {GalaxyArea} from '../../game-objects/galaxy-area/galaxy-area';
import {GameScene} from '../game-scene';
import {SpaceSkybox} from '../../game-objects/skybox/space-skybox/space-skybox';

export class GalaxyScene extends GameScene {
    public camera: BABYLON.FreeCamera;
    public skybox: SpaceSkybox;
    public galaxyAreas: GalaxyArea[] = [];
}