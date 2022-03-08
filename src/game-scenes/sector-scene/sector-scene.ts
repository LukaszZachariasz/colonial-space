import * as BABYLON from 'babylonjs';
import {FromAboveCamera} from '../../engine/camera/from-above-camera/from-above-camera';
import {GameSceneGui} from '../game-scene-gui';
import {GameSceneLoading} from '../game-scene-loading';

export class SectorScene extends GameSceneLoading {
    public camera: FromAboveCamera;
    public gui: GameSceneGui;
    public ground: BABYLON.Mesh;
}