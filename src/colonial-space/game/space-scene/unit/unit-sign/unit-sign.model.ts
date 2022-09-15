import * as BABYLON from 'babylonjs';
import {Injector} from '@colonial-space/core/injector/injector';
import {SceneGuiManager} from '@colonial-space/core/scene-manager/gui/scene-gui-manager';
import {SimpleModel} from '../../../../../core/scene-manager/model/model-elements/simple-model';
import {Subject, tap} from 'rxjs';
import {UnitSignIconContainer} from './unit-sign-icon.container';
import {UnitState} from '../../../game-logic/store/unit/unit.state';

export class UnitSignModel extends SimpleModel<BABYLON.Mesh> {
    public unitSignIconControl: UnitSignIconContainer;
    public clicked$ = new Subject<void>();

    constructor(private scene: BABYLON.Scene,
                private unitState: UnitState) {
        super();
    }

    public onCreate(): void {
        this.mesh = BABYLON.Mesh.CreatePlane('sign', 2, this.scene);
        this.mesh.rotation.x = Math.PI;
        this.mesh.position.y = -5; // TODO: why -5 instead of 5?
        this.mesh.billboardMode = BABYLON.Mesh.BILLBOARDMODE_ALL;

        this.createUnitSignIconControl();
    }

    private createUnitSignIconControl(): void {
        this.unitSignIconControl = new UnitSignIconContainer(this.unitState);
        this.unitSignIconControl.clicked$.pipe(
            tap(() => this.clicked$.next())
        ).subscribe();

        Injector.inject(SceneGuiManager).createForMesh('UnitSignModel', this.mesh, this.unitSignIconControl);
    }
}
