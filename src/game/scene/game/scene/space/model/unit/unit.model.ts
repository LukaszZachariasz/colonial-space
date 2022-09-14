import * as BABYLON from 'babylonjs';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {Container} from 'typedi';
import {FadeInAnimation} from '../../animations/fade-in/fade-in.animation';
import {FadeOutAnimation} from '../../animations/fade-out/fade-out.animation';
import {ImportModelAbstract} from '../../../../../../core/model-manager/model-elements/import-model';
import {ModelManagerService} from '../../../../../../core/model-manager/model-manager.service';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {OnReady} from '@colonial-space/core/lifecycle/on-ready/on-ready';
import {SelectedUnitService} from '../../../../logic/services/unit/selected-unit.service';
import {Subscription, delay, filter, tap} from 'rxjs';
import {UnitMovement} from './unit-movement/unit-movement';
import {UnitService} from '../../../../logic/services/unit/unit.service';
import {UnitSignModel} from './unit-sign/unit-sign.model';
import {UnitState} from '../../../../logic/store/unit/unit.state';

export abstract class UnitModel extends ImportModelAbstract implements OnInit, OnReady, OnDestroy {
    public unitMovement: UnitMovement;
    public unitSignModel: UnitSignModel;
    public actionMesh: BABYLON.AbstractMesh;

    private removeUnitSubscription: Subscription;
    private unitSignModelClickedSubscription: Subscription;

    protected constructor(protected scene: BABYLON.Scene,
                          protected state: UnitState) {
        super();
    }

    public gameOnInit(): void {
        this.createUnitSignModel();
        this.unitMovement = new UnitMovement(this.scene, this.state.id, this.primaryMesh);

        this.removeUnitSubscription = Container.get(UnitService).removeUnitId$.pipe(
            filter((id: string) => this.state.id === id),
            tap(() => this.runExitAnimation()),
            delay(1000),
            tap(() => this.primaryMesh.dispose()),
            tap(() => this.unitSignModel.mesh.dispose())
        ).subscribe();
    }

    public gameOnReady(): void {
        this.runEnterAnimation();
    }

    public createUnitSignModel(): void {
        this.unitSignModel = Container.get(ModelManagerService).addSimpleModel(new UnitSignModel(this.scene, this.state));
        this.unitSignModel.mesh.parent = this.primaryMesh;
        this.unitSignModelClickedSubscription = this.unitSignModel.clicked$.pipe(tap(() => this.select())).subscribe();
    }

    protected select(): void {
        Container.get(SelectedUnitService).select(this.state.id);
    }

    private runEnterAnimation(): void {
        this.actionMesh.parent.getChildMeshes().forEach((childMesh: BABYLON.AbstractMesh) => {
            FadeInAnimation.run(childMesh);
        });

        FadeInAnimation.run(this.unitSignModel.mesh, 1000);
    }

    private runExitAnimation(): void {
        this.actionMesh.parent.getChildMeshes().forEach((childMesh: BABYLON.AbstractMesh) => {
            FadeOutAnimation.run(childMesh);
        });

        FadeOutAnimation.run(this.unitSignModel.mesh);
    }

    public gameOnDestroy(): void {
        this.unitMovement.gameOnDestroy();
        this.unitSignModelClickedSubscription?.unsubscribe();
        this.removeUnitSubscription?.unsubscribe();
    }
}
