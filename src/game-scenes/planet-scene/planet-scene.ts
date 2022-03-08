import * as BABYLON from 'babylonjs';
import {GameSceneGui} from '../game-scene-gui';
import {GameSceneLoading} from '../game-scene-loading';
import {Planet} from '../../game-objects/planet/planet';
import {SpaceSkybox} from '../../game-objects/skybox/space-skybox/space-skybox';

export class PlanetScene extends GameSceneLoading {
    public camera: BABYLON.ArcRotateCamera;
    public skybox: SpaceSkybox;
    public planet: Planet;
    public gui: GameSceneGui;
}