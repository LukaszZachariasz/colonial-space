import * as BABYLON from 'babylonjs';
import {FadeInAnimation} from '../../../shared/animations/fade-in/fade-in.animation';
import {ImportModelAbstract} from '../../../../core/scene-manager/model/model-elements/import-model';
import {Inject} from '@colonial-space/core/injector/inject';
import {ModelManager} from '@colonial-space/core/scene-manager/model/model-manager';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {SelectionTerritoryService} from '../../game-logic/selection/territory/selection-territory.service';
import {TerritorySignModel} from './territory-sign/territory-sign.model';
import {TerritoryState} from '../../game-logic/store/territory/territory.state';
import {TerritoryType} from '../../game-logic/store/territory/territory-type';
import {tap} from 'rxjs';

export abstract class TerritoryModel extends ImportModelAbstract implements OnLoad {
    @Inject(ModelManager) private modelManager: ModelManager;
    @Inject(SelectionTerritoryService) private selectionTerritoryService: SelectionTerritoryService;
    
    public abstract type: TerritoryType;

    public actionMesh: BABYLON.AbstractMesh;
    public territorySignModel: TerritorySignModel;

    protected constructor(protected scene: BABYLON.Scene,
                          protected state: TerritoryState) {
        super();
    }

    public gameOnLoad(): void {
        this.createTerritorySignModel();
        this.runEnterAnimation();
    }

    protected select(): void {
        this.selectionTerritoryService.select(this.state.id);
    }

    private createTerritorySignModel(): void {
        this.territorySignModel = this.modelManager.addSimpleModel(new TerritorySignModel(this.scene, this.state));
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
