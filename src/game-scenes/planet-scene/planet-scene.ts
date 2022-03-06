import * as BABYLON from 'babylonjs';
import {GameScene} from '../game-scene';
import {Planet} from '../../game-objects/planet/planet';
import {SpaceSkybox} from '../../game-objects/skybox/space-skybox/space-skybox';

export class PlanetScene extends GameScene {
    public camera: BABYLON.ArcRotateCamera;
    public skybox: SpaceSkybox;
    public planet: Planet;
}