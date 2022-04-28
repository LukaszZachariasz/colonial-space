import * as BABYLON from 'babylonjs';
import {UnitMovement} from './unit-movement/unit-movement';
import {logic} from '../../../../game';

export abstract class UnitModel {
    public abstract artUrl: string;
    public unitMovement: UnitMovement;

    protected meshes: BABYLON.AbstractMesh[];

    protected transformMesh: BABYLON.AbstractMesh;
    protected actionMesh: BABYLON.AbstractMesh;

    public get unitId(): string {
        return this.id;
    }

    protected constructor(protected scene: BABYLON.Scene,
                          protected id: string) {
    }

    protected createUnitMovement(): void {
        this.unitMovement = new UnitMovement(this.scene, this.id, this.transformMesh);
    }

    protected select(): void {
        logic().selectedUnitService.select(this);
    }
}
