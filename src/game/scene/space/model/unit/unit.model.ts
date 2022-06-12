import * as BABYLON from 'babylonjs';
import {ImportModel} from '../../../../../engine/model-manager/model-elements/import-model';
import {Subscription, filter, tap} from 'rxjs';
import {UnitMovement} from './unit-movement/unit-movement';
import {UnitSignModel} from './unit-sign/unit-sign.model';
import {UnitState} from '../../../../logic/store/unit/unit.state';
import {logic} from '../../../../game';
import {modelManager} from 'engine';

export abstract class UnitModel extends ImportModel {
    public unitMovement: UnitMovement;
    public unitSignModel: UnitSignModel;
    public actionMesh: BABYLON.AbstractMesh;

    private removeUnitSubscription: Subscription;
    private unitSignModelClickedSubscription: Subscription;

    protected constructor(protected scene: BABYLON.Scene,
                          protected state: UnitState) {
        super();
    }

    public onReady(): void {
        this.createUnitSignModel();
        this.unitMovement = new UnitMovement(this.scene, this.state.id, this.mesh);

        this.removeUnitSubscription = logic().unitService.removeUnitId$.pipe( // TODO: improve memory leak
            filter((id: string) => this.state.id === id),
            tap(() => this.mesh.dispose()),
            tap(() => this.unitSignModel.mesh.dispose())
        ).subscribe();
    }

    public createUnitSignModel(): void {
        this.unitSignModel = modelManager().addModel(new UnitSignModel(this.scene, this.state));
        this.unitSignModel.mesh.parent = this.mesh;
        this.unitSignModelClickedSubscription = this.unitSignModel.clicked$.pipe(tap(() => this.select())).subscribe();
    }

    protected select(): void {
        logic().selectedUnitService.select(this.state.id);
    }

    public onDestroy(): void {
        this.unitSignModelClickedSubscription?.unsubscribe();
        this.removeUnitSubscription?.unsubscribe();
    }
}
