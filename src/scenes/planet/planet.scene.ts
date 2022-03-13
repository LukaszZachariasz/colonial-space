import * as BABYLON from 'babylonjs';
import {Planet} from '../../game-objects/planet/planet';
import {PlanetSceneGui} from './gui/planet.scene-gui';
import {Scene} from '../scene';
import {SpaceSkybox} from '../../game-objects/skybox/space-skybox/space-skybox';

export class PlanetScene extends Scene<BABYLON.ArcRotateCamera, PlanetSceneGui> {
    public skybox: SpaceSkybox;
    public planet: Planet;

    constructor() {
        super(true);
    }
}
