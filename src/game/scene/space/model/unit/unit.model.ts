import * as BABYLON from 'babylonjs';
import {Model} from '../model';
import {UnitMovement} from './unit-movement/unit-movement';
import {logic} from '../../../../game';

export abstract class UnitModel extends Model {
    public abstract artUrl: string;
    public unitMovement: UnitMovement;

    protected meshes: BABYLON.AbstractMesh[];

    protected transformMesh: BABYLON.AbstractMesh;
    protected actionMesh: BABYLON.AbstractMesh;

    public abstract create(scene: BABYLON.Scene): void;

    protected constructor(public id: string) {
        super();
    }

    protected initialize(): void {
        this.unitMovement = new UnitMovement(this.id, this.transformMesh);
    }

    protected select(): void {
        logic().selectedUnitService.select(this);
    }
}
