import * as BABYLON from 'babylonjs';
import {GalaxyArea} from '../../game-objects/galaxy-area/galaxy-area';
import {GalaxyOrigin} from '../../game-objects/galaxy-origin/galaxy-origin';
import {GameSceneGui} from '../game-scene-gui';
import {GameSceneLoading} from '../game-scene-loading';
import {SpaceSkybox} from '../../game-objects/skybox/space-skybox/space-skybox';

export class GalaxyScene extends GameSceneLoading {
    public name: string;
    public camera: BABYLON.FreeCamera;
    public skybox: SpaceSkybox;
    public galaxyOrigin: GalaxyOrigin;
    public galaxyAreas: GalaxyArea[] = [];
    public gui: GameSceneGui;
}