import * as BABYLON from 'babylonjs';
import {Model} from '../model';
import {Selectable} from '../../../../logic/selection/selectable';
import {UnitMovement} from './unit-movement';
import {UnitState} from '../../../../store/unit/unit.state';
import {logic} from '../../../../game';

export abstract class UnitModel extends Model implements Selectable {
    public abstract artUrl: string;

    public abstract create(scene: BABYLON.Scene): void;

    protected meshes: BABYLON.AbstractMesh[];

    protected transformMesh: BABYLON.AbstractMesh;

    protected actionMesh: BABYLON.AbstractMesh;

    private unitMovement: UnitMovement;

    protected constructor(public state: UnitState) {
        super();
    }

    protected initialize(): void {
        this.unitMovement = new UnitMovement(this.state, this.transformMesh);
    }

    protected select(): void {
        logic().selectionService.select(this);
    }
}
