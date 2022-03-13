import * as BABYLON from 'babylonjs';
import {GameScene} from '../game-scene';
import {Planet} from '../../game-objects/planet/planet';
import {PlanetSceneGui} from './gui/planet-scene-gui';
import {SpaceSkybox} from '../../game-objects/skybox/space-skybox/space-skybox';

export class PlanetScene extends GameScene<BABYLON.ArcRotateCamera, PlanetSceneGui> {
    public skybox: SpaceSkybox;
    public planet: Planet;

    constructor() {
        super(true);
    }
}
