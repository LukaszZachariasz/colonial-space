import * as BABYLON from 'babylonjs';
import {Model} from '../model';
import {Selectable} from '../../../../logic/select-model-manager/selectable';
import {UnitState} from '../../../../store/unit/unit.state';
import {logic} from '../../../../game';

export abstract class UnitModel extends Model implements Selectable{
    public state: UnitState;

    public abstract artUrl: string;

    protected meshes: BABYLON.AbstractMesh[];

    protected actionManager: BABYLON.ActionManager;


    protected select(): void {
        logic().selectModelManager.select(this);
    }

}
