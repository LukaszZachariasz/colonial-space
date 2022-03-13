import * as BABYLON from 'babylonjs';
import {GalaxyArea} from '../../game-objects/galaxy-area/galaxy-area';
import {GalaxySceneGui} from './gui/galaxy-scene-gui';
import {GameScene} from '../game-scene';
import {GeneratedGalaxyDust} from '../../game-objects/galaxy/generated-galaxy-dust';
import {GeneratedGalaxyOrigin} from '../../game-objects/galaxy/generated-galaxy-origin';
import {SpaceSkybox} from '../../game-objects/skybox/space-skybox/space-skybox';


export class GalaxyScene extends GameScene<BABYLON.FreeCamera | BABYLON.ArcRotateCamera, GalaxySceneGui> {
    public skybox: SpaceSkybox;
    public galaxyAreas: GalaxyArea[] = [];
    public generatedGalaxyOrigin: GeneratedGalaxyOrigin;
    public generatedGalaxyDust: GeneratedGalaxyDust;

    constructor() {
        super(true);
    }
}
