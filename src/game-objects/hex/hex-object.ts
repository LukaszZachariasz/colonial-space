import * as BABYLON from 'babylonjs';
import {GameObject} from '../game-object';

export abstract class HexObject implements GameObject {
    public position: BABYLON.Vector2;
    public abstract create(scene: BABYLON.Scene): void;
}