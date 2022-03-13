import * as BABYLON from 'babylonjs';
import {FromAboveCamera} from '../../engine/camera/from-above-camera/from-above-camera';
import {GameScene} from '../game-scene';
import {SectorSceneGui} from './gui/sector-scene-gui';

export class SectorScene extends GameScene<FromAboveCamera, SectorSceneGui> {
    public ground: BABYLON.Mesh;

    constructor() {
        super(true);
    }
}
