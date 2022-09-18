import * as BABYLON from 'babylonjs';
import {FadeInAnimation} from '../../../../shared/animations/fade-in/fade-in.animation';
import {HighlightSelect} from '../../../../shared/highlight-select/highlight-select';
import {ImportModelAbstract} from '@colonial-space/core/scene-manager/model/model-elements/import-model';
import {Inject} from '@colonial-space/core/injector/inject';
import {ModelManager} from '@colonial-space/core/scene-manager/model/model-manager';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {OnUnload} from '@colonial-space/core/lifecycle/on-unload/on-unload';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {SelectionTerritoryService} from '../../../game-logic/selection/territory/selection-territory.service';
import {Subscription, tap} from 'rxjs';
import {TerritorySignModel} from './territory-sign/territory-sign.model';
import {TerritoryState} from '../../../game-logic/store/territory/territory.state';
import {TerritoryType} from '../../../game-logic/store/territory/territory-type';

export abstract class TerritoryModel extends ImportModelAbstract implements OnLoad, OnUnload {
    @Inject(ModelManager) private modelManager: ModelManager;
    @Inject(SelectionTerritoryService) private selectionTerritoryService: SelectionTerritoryService;
    @Inject(SCENE) protected scene: BABYLON.Scene;
    
    public abstract type: TerritoryType;

    public actionMesh: BABYLON.AbstractMesh;
    public territorySignModel: TerritorySignModel;
    public highlightSelect: HighlightSelect;

    private highlightClickedSubscription: Subscription;

    protected constructor(protected state: TerritoryState) {
        super();
    }

    public gameOnLoad(): void {
        this.highlightSelect = new HighlightSelect(this.actionMesh as BABYLON.Mesh);
        this.highlightClickedSubscription = this.highlightSelect.clicked$.pipe(
            tap(() => this.select())
        ).subscribe();
        this.createTerritorySignModel();
        this.runEnterAnimation();
    }

    public gameOnUnload(): void {
        this.highlightClickedSubscription?.unsubscribe();
    }

    protected select(): void {
        this.selectionTerritoryService.select(this.state.id);
    }

    private createTerritorySignModel(): void {
        this.territorySignModel = this.modelManager.addModel(TerritorySignModel, this.scene, this.state);
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
