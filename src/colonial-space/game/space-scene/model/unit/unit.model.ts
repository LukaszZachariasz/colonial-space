import * as BABYLON from 'babylonjs';
import {FadeInAnimation} from '../../../../shared/animations/fade-in/fade-in.animation';
import {FadeOutAnimation} from '../../../../shared/animations/fade-out/fade-out.animation';
import {ImportModelAbstract} from '@colonial-space/core/scene-manager/model/model-elements/import-model';
import {Inject} from '@colonial-space/core/injector/inject';
import {ModelManager} from '@colonial-space/core/scene-manager/model/model-manager';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {SelectionUnitService} from '../../../game-logic/selection/unit/selection-unit.service';
import {Subscription, delay, filter, tap} from 'rxjs';
import {UnitMovement} from './unit-movement/unit-movement';
import {UnitService} from '../../../game-logic/unit/unit.service';
import {UnitSignModel} from './unit-sign/unit-sign.model';
import {UnitState} from '../../../game-logic/store/unit/unit.state';

export abstract class UnitModel extends ImportModelAbstract implements OnLoad, OnDestroy {
    @Inject(ModelManager) private modelManager: ModelManager;
    @Inject(UnitService) private unitService: UnitService;
    @Inject(SelectionUnitService) private selectionUnitService: SelectionUnitService;
    @Inject(SCENE) protected scene: BABYLON.Scene;

    public unitMovement: UnitMovement;
    public unitSignModel: UnitSignModel;
    public actionMesh: BABYLON.AbstractMesh;

    private removeUnitSubscription: Subscription;
    private unitSignModelClickedSubscription: Subscription;

    protected constructor(protected state: UnitState) {
        super();
    }

    public gameOnLoad(): void {
        this.createUnitSignModel();
        this.unitMovement = new UnitMovement(this.scene, this.state.id, this.primaryMesh);

        this.removeUnitSubscription = this.unitService.removeUnitId$.pipe(
            filter((id: string) => this.state.id === id),
            tap(() => this.runExitAnimation()),
            delay(1000),
            tap(() => this.primaryMesh.dispose()),
            tap(() => this.unitSignModel.mesh.dispose())
        ).subscribe();
        
        this.runEnterAnimation();
    }

    public createUnitSignModel(): void {
        this.unitSignModel = this.modelManager.addModel(UnitSignModel, this.scene, this.state);
        this.unitSignModel.mesh.parent = this.primaryMesh;
        this.unitSignModelClickedSubscription = this.unitSignModel.clicked$.pipe(tap(() => this.select())).subscribe();
    }

    protected select(): void {
        this.selectionUnitService.select(this.state.id);
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
