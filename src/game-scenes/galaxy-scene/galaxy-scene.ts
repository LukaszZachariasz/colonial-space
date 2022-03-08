import * as BABYLON from 'babylonjs';
import {GalaxyArea} from '../../game-objects/galaxy-area/galaxy-area';
import {GameSceneGui} from '../game-scene-gui';
import {GameSceneLoading} from '../game-scene-loading';
import {SpaceSkybox} from '../../game-objects/skybox/space-skybox/space-skybox';

export class GalaxyScene extends GameSceneLoading {
    public camera: BABYLON.FreeCamera;
    public skybox: SpaceSkybox;
    public galaxyAreas: GalaxyArea[] = [];
    public gui: GameSceneGui;
}