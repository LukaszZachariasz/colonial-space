import * as BABYLON from 'babylonjs';
import {FadeInAnimation} from '../../animations/fade-in/fade-in.animation';
import {ImportModelAbstract} from '../../../../../engine/model-manager/model-elements/import-model';
import {OnReady} from '../../../../../engine/lifecycle/on-ready/on-ready';
import {TerritorySignModel} from './territory-sign/territory-sign.model';
import {TerritoryState} from '../../../../logic/store/territory/territory.state';
import {TerritoryType} from '../../../../logic/store/territory/territory-type';
import {logic} from '../../../../game';
import {modelManager} from 'engine';
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
        logic().selectedTerritoryService.select(this.state.id);
    }

    private createTerritorySignModel(): void {
        this.territorySignModel = modelManager().addModel(new TerritorySignModel(this.scene, this.state));
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
