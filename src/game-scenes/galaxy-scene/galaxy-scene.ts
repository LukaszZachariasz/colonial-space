import * as BABYLON from 'babylonjs';
import {GalaxyArea} from '../../game-objects/galaxy-area/galaxy-area';
import {GameSceneGui} from '../game-scene-gui';
import {GameSceneLoading} from '../game-scene-loading';
import {GeneratedGalaxyDust} from '../../game-objects/galaxy/generated-galaxy-dust';
import {GeneratedGalaxyOrigin} from '../../game-objects/galaxy/generated-galaxy-origin';
import {SpaceSkybox} from '../../game-objects/skybox/space-skybox/space-skybox';


export class GalaxyScene extends GameSceneLoading {
    public name: string;
    public camera: BABYLON.FreeCamera | BABYLON.ArcRotateCamera;
    public skybox: SpaceSkybox;
    public galaxyAreas: GalaxyArea[] = [];
    public gui: GameSceneGui;
    public generatedGalaxyOrigin: GeneratedGalaxyOrigin;
    public generatedGalaxyDust: GeneratedGalaxyDust;
}
