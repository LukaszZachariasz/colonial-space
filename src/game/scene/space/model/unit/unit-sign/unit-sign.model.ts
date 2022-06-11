import * as BABYLON from 'babylonjs';
import {Subject, tap} from 'rxjs';
import {UnitSignIconContainer} from './unit-sign-icon.container';
import {UnitState} from '../../../../../logic/store/unit/unit.state';
import {guiManager} from 'engine';

export class UnitSignModel {
    public signMesh: BABYLON.Mesh;
    public unitSignIconControl: UnitSignIconContainer;
    public clicked$ = new Subject<void>();

    constructor(private scene: BABYLON.Scene,
                private unitState: UnitState) {
        this.signMesh = BABYLON.Mesh.CreatePlane('sign', 2, this.scene);
        this.signMesh.rotation.x = Math.PI;
        this.signMesh.position.y = -5; // TODO: why -5 instead of 5?
        this.signMesh.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

        this.unitSignIconControl = new UnitSignIconContainer(this.unitState);
        this.unitSignIconControl.clicked$.pipe(
            tap(() => this.clicked$.next())
        ).subscribe();

        guiManager().createForMesh('UnitSignModel', this.signMesh, this.unitSignIconControl);
    }
}
