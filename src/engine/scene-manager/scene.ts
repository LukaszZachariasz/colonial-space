import * as BABYLON from 'babylonjs';
import {gameEngine} from '../../core/game-platform';

export abstract class Scene<T extends BABYLON.Camera = BABYLON.Camera, Q = {}> {
    public scene: BABYLON.Scene = new BABYLON.Scene(gameEngine().engine);

    public name: string;
    public abstract camera: T;
    public abstract gui: Q;
}
