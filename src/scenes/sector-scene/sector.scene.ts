import * as BABYLON from 'babylonjs';
import {FromAboveCamera} from '../../engine/camera/from-above-camera/from-above-camera';
import {Scene} from '../scene';
import {SectorSceneGui} from './gui/sector.scene-gui';

export class SectorScene extends Scene<FromAboveCamera, SectorSceneGui> {
    public ground: BABYLON.Mesh;

    constructor() {
        super(true);
    }
}
