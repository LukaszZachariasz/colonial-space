import * as BABYLON from 'babylonjs';
import {GalaxySceneGui} from './gui/galaxy.scene-gui';
import {GeneratedGalaxyDust} from '../../game-objects/galaxy/generated-galaxy-dust';
import {GeneratedGalaxyOrigin} from '../../game-objects/galaxy/generated-galaxy-origin';
import {Orbit} from '../../game-objects/orbit/orbit';
import {Scene} from '../scene';
import {SpaceSkybox} from '../../game-objects/skybox/space-skybox/space-skybox';

export class GalaxyScene extends Scene<BABYLON.ArcRotateCamera, GalaxySceneGui> {
    public name: string;
    public skybox: SpaceSkybox;
    public orbits: Orbit[] = [];
    public generatedGalaxyOrigin: GeneratedGalaxyOrigin;
    public generatedGalaxyDust: GeneratedGalaxyDust;

    constructor() {
        super(true);
    }
}
