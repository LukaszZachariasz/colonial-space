import * as BABYLON from 'babylonjs';
import {FadeInAnimation} from '../../../shared/animations/fade-in/fade-in.animation';
import {ImportModelAbstract} from '../../../../core/scene-manager/model/model-elements/import-model';
import {Injector} from '@colonial-space/core/injector/injector';
import {ModelManager} from '@colonial-space/core/scene-manager/model/model-manager';
import {OnReady} from '@colonial-space/core/lifecycle/on-ready/on-ready';
import {SelectionTerritoryService} from '../../game-logic/selection/territory/selection-territory.service';
import {TerritorySignModel} from './territory-sign/territory-sign.model';
import {TerritoryState} from '../../game-logic/store/territory/territory.state';
import {TerritoryType} from '../../game-logic/store/territory/territory-type';
import {tap} from 'rxjs';

export abstract class TerritoryModel extends ImportModelAbstract implements OnReady {
    public abstract type: TerritoryType;

    public actionMesh: BABYLON.AbstractMesh;
    public territorySignModel: TerritorySignModel;

    protected constructor(protected scene: BABYLON.Scene,
                          protected state: TerritoryState) {
        super();
    }

    public gameOnReady(): void {
        this.createTerritorySignModel();
        this.runEnterAnimation();
    }

    protected select(): void {
        Injector.inject(SelectionTerritoryService).select(this.state.id);
    }

    private createTerritorySignModel(): void {
        this.territorySignModel = Injector.inject(ModelManager).addSimpleModel(new TerritorySignModel(this.scene, this.state));
        this.territorySignModel.mesh.parent = this.primaryMesh;
        this.territorySignModel.clicked$.pipe(tap(() => this.select())).subscribe();
    }

    private runEnterAnimation(): void {
        this.actionMesh.parent.getChildMeshes().forEach((childMesh: BABYLON.AbstractMesh) => {
            FadeInAnimation.run(childMesh);
        });

        FadeInAnimation.run(this.territorySignModel.mesh, 1000);
    }
}
