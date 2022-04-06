import * as BABYLON from 'babylonjs';
import {Model} from '../model';
import {Selectable} from '../../../../logic/services/selection/selectable';
import {UnitMovement} from './unit-movement/unit-movement';
import {logic} from '../../../../game';

export abstract class UnitModel extends Model implements Selectable {
    public abstract artUrl: string;
    protected meshes: BABYLON.AbstractMesh[];

    protected transformMesh: BABYLON.AbstractMesh;
    protected actionMesh: BABYLON.AbstractMesh;

    private unitMovement: UnitMovement;

    public abstract create(scene: BABYLON.Scene): void;

    protected constructor(public id: string) {
        super();
    }

    protected initialize(): void {
        this.unitMovement = new UnitMovement(this.id, this.transformMesh);
    }

    protected select(): void {
        logic().selectionService.select(this);
    }
}
