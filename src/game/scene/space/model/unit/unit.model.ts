import * as BABYLON from 'babylonjs';
import {UnitMovement} from './unit-movement/unit-movement';
import {UnitSignModel} from './unit-sign/unit-sign.model';
import {UnitState} from '../../../../logic/store/unit/unit.state';
import {filter, tap} from 'rxjs';
import {logic} from '../../../../game';

export abstract class UnitModel {
    public unitMovement: UnitMovement;
    public unitSignModel: UnitSignModel;

    protected meshes: BABYLON.AbstractMesh[];

    protected transformMesh: BABYLON.AbstractMesh;
    protected actionMesh: BABYLON.AbstractMesh;

    protected constructor(protected scene: BABYLON.Scene,
                          protected state: UnitState) {
    }

    protected afterModelLoaded(): void {
        this.unitSignModel = new UnitSignModel(this.scene, this.state);
        this.unitSignModel.signMesh.parent = this.transformMesh;
        this.unitSignModel.clicked$.pipe(tap(() => this.select())).subscribe();

        this.unitMovement = new UnitMovement(this.scene, this.state.id, this.transformMesh);

        logic().unitService.removeUnitId$.pipe( // TODO: improve memory leak
            filter((id: string) => this.state.id === id),
            tap(() => this.transformMesh.dispose()),
            tap(() => this.unitSignModel.signMesh.dispose())
        ).subscribe();
    }

    protected select(): void {
        logic().selectedUnitService.select(this.state.id);
    }
}
