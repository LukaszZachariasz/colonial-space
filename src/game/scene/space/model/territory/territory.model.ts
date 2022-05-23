import * as BABYLON from 'babylonjs';
import {TerritorySignModel} from './territory-sign/territory-sign.model';
import {TerritoryState} from '../../../../logic/store/territory/territory.state';
import {TerritoryType} from '../../../../logic/store/territory/territory-type';
import {logic} from '../../../../game';
import {tap} from 'rxjs';

export abstract class TerritoryModel {
    public territorySignModel: TerritorySignModel;
    public abstract type: TerritoryType;

    protected actionMesh: BABYLON.AbstractMesh;
    protected transformMesh: BABYLON.AbstractMesh;

    protected constructor(protected scene: BABYLON.Scene,
                          protected state: TerritoryState) {
    }

    protected afterModelLoaded(): void {
        this.territorySignModel = new TerritorySignModel(this.scene, this.state);
        this.territorySignModel.signMesh.parent = this.transformMesh;
        this.territorySignModel.clicked$.pipe(tap(() => this.select())).subscribe();
    }

    protected select(): void {
        logic().selectedTerritoryService.select(this.state.id);
    }
}
