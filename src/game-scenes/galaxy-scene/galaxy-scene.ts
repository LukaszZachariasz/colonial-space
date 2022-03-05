import * as BABYLON from "babylonjs";
import {SpaceSkybox} from "../../game-objects/skybox/space-skybox/space-skybox";
import {GameScene} from "../game-scene";

export class GalaxyScene extends GameScene {
    camera: BABYLON.FreeCamera;
    skybox: SpaceSkybox;
}