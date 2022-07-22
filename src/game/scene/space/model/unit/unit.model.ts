import * as BABYLON from 'babylonjs';
import {AfterCreated} from '../../../../../engine/lifecycle/after-created/after-created';
import {ImportModelAbstract} from '../../../../../engine/model-manager/model-elements/import-model';
import {OnDestroy} from '../../../../../engine/lifecycle/on-destroy/on-destroy';
import {Subscription, filter, tap} from 'rxjs';
import {UnitMovement} from './unit-movement/unit-movement';
import {UnitSignModel} from './unit-sign/unit-sign.model';
import {UnitState} from '../../../../logic/store/unit/unit.state';
import {logic} from '../../../../game';
import {modelManager} from 'engine';

export abstract class UnitModel extends ImportModelAbstract implements AfterCreated, OnDestroy {
    public unitMovement: UnitMovement;
    public unitSignModel: UnitSignModel;
    public actionMesh: BABYLON.AbstractMesh;

    private removeUnitSubscription: Subscription;
    private unitSignModelClickedSubscription: Subscription;

    protected constructor(protected scene: BABYLON.Scene,
                          protected state: UnitState) {
        super();
    }

    public gameAfterCreated(): void {
        this.createUnitSignModel();
        this.unitMovement = new UnitMovement(this.scene, this.state.id, this.primaryMesh);

        this.removeUnitSubscription = logic().unitService.removeUnitId$.pipe(
            filter((id: string) => this.state.id === id),
            tap(() => this.primaryMesh.dispose()),
            tap(() => this.unitSignModel.mesh.dispose())
        ).subscribe();
    }

    public createUnitSignModel(): void {
        this.unitSignModel = modelManager().addModel(new UnitSignModel(this.scene, this.state));
        this.unitSignModel.mesh.parent = this.primaryMesh;
        this.unitSignModelClickedSubscription = this.unitSignModel.clicked$.pipe(tap(() => this.select())).subscribe();
    }

    protected select(): void {
        logic().selectedUnitService.select(this.state.id);
    }

    public gameOnDestroy(): void {
        this.unitSignModelClickedSubscription?.unsubscribe();
        this.removeUnitSubscription?.unsubscribe();
    }
}
