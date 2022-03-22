import * as BABYLON from 'babylonjs';
import {Model} from '../../model';

export abstract class UnitModel extends Model {
    public position: BABYLON.Vector3;
    protected mesh: BABYLON.AbstractMesh;

    protected actionManager: BABYLON.ActionManager;
}
