import {GameScene} from "../game-scene";
import * as BABYLON from "babylonjs";
import {Planet} from "../../game-objects/planet/planet";
import {SpaceSkybox} from "../../game-objects/skybox/space-skybox/space-skybox";

export class PlanetScene extends GameScene {
    camera: BABYLON.ArcRotateCamera;
    skybox: SpaceSkybox;
    planet: Planet;
}