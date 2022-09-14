import * as BABYLON from 'babylonjs';
import {Container} from 'typedi';
import {FadeInAnimation} from '../../animations/fade-in/fade-in.animation';
import {ImportModelAbstract} from '../../../../../core/model-manager/model-elements/import-model';
import {ModelManagerService} from '../../../../../core/model-manager/model-manager.service';
import {OnReady} from '../../../../../../core/lifecycle/on-ready/on-ready';
import {SelectedTerritoryService} from '../../../../logic/services/territory/selected-territory.service';
import {TerritorySignModel} from './territory-sign/territory-sign.model';
import {TerritoryState} from '../../../../logic/store/territory/territory.state';
import {TerritoryType} from '../../../../logic/store/territory/territory-type';
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
        Container.get(SelectedTerritoryService).select(this.state.id);
    }

    private createTerritorySignModel(): void {
        this.territorySignModel = Container.get(ModelManagerService).addSimpleModel(new TerritorySignModel(this.scene, this.state));
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
