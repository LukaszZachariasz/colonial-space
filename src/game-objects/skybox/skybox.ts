import * as BABYLON from 'babylonjs';
import {GameObject} from '../game-object';

export interface Skybox extends GameObject {
    skybox: BABYLON.Mesh;
    material: BABYLON.StandardMaterial;
}