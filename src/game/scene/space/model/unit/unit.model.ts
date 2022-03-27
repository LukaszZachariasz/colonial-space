import * as BABYLON from 'babylonjs';
import {Model} from '../model';
import {Selectable} from '../../../../logic/services/selection/selectable';
import {UnitMovement} from './unit-movement';
import {UnitState} from '../../../../logic/store/unit/unit.state';
import {logic} from '../../../../game';
import {selectUnitById} from '../../../../logic/store/unit/unit.selectors';

export abstract class UnitModel extends Model implements Selectable {
    public abstract artUrl: string;
    protected state: UnitState;
    protected meshes: BABYLON.AbstractMesh[];
    private unitMovement: UnitMovement;

    public abstract create(scene: BABYLON.Scene): void;

    protected constructor(public id: string) {
        super();
        this.state = selectUnitById(this.id);
    }

    protected initialize(): void {
        this.unitMovement = new UnitMovement(this.state, this.meshes);
    }

    protected select(): void {
        logic().selectionService.select(this);
    }
}
