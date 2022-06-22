import * as BABYLON from 'babylonjs';
import {ImportModelAbstract} from '../../../../../engine/model-manager/model-elements/import-model';
import {OnDestroy} from '../../../../../engine/lifecycle/on-destroy/on-destroy';
import {OnReady} from '../../../../../engine/lifecycle/on-ready/on-ready';
import {Subscription, filter, tap} from 'rxjs';
import {UnitMovement} from './unit-movement/unit-movement';
import {UnitSignModel} from './unit-sign/unit-sign.model';
import {UnitState} from '../../../../logic/store/unit/unit.state';
import {logic} from '../../../../game';
import {modelManager} from 'engine';

export abstract class UnitModel extends ImportModelAbstract implements OnReady, OnDestroy {
    public unitMovement: UnitMovement;
    public unitSignModel: UnitSignModel;
    public actionMesh: BABYLON.AbstractMesh;

    private removeUnitSubscription: Subscription;
    private unitSignModelClickedSubscription: Subscription;

    protected constructor(protected scene: BABYLON.Scene,
                          protected state: UnitState) {
        super();
    }

    public gameOnReady(): void {
        this.createUnitSignModel();
        this.unitMovement = new UnitMovement(this.scene, this.state.id, this.meshes[0]);

        this.removeUnitSubscription = logic().unitService.removeUnitId$.pipe(
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

    public gameOnDestroy(): void {
        this.unitSignModelClickedSubscription?.unsubscribe();
        this.removeUnitSubscription?.unsubscribe();
    }
}
