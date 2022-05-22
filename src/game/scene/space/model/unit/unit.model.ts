import * as BABYLON from 'babylonjs';
import {tap} from 'rxjs';
import {UnitMovement} from './unit-movement/unit-movement';
import {UnitSignModel} from './unit-sign/unit-sign.model';
import {logic} from '../../../../game';

export abstract class UnitModel {
    public abstract artUrl: string;
    public unitMovement: UnitMovement;

    public unitSignModel: UnitSignModel;

    protected meshes: BABYLON.AbstractMesh[];

    protected transformMesh: BABYLON.AbstractMesh;
    protected actionMesh: BABYLON.AbstractMesh;

    public get unitId(): string {
        return this.id;
    }

    protected constructor(protected scene: BABYLON.Scene,
                          protected id: string) {
    }

    protected afterModelLoaded(): void {
        this.unitSignModel = new UnitSignModel(this.scene);
        this.unitSignModel.signMesh.parent = this.transformMesh;
        this.unitSignModel.clicked$.pipe(tap(() => this.select())).subscribe();

        this.unitMovement = new UnitMovement(this.scene, this.id, this.transformMesh);
    }

    protected select(): void {
        logic().selectedUnitService.select(this);
    }
}
