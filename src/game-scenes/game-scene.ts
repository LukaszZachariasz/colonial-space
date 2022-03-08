import * as BABYLON from 'babylonjs';
import {GameSceneGui} from './game-scene-gui';
import engine from 'engine';

export abstract class GameScene {
    public scene: BABYLON.Scene = new BABYLON.Scene(engine.engine);
    public gui: GameSceneGui;
}
