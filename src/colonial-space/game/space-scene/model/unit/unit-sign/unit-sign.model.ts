import * as BABYLON from 'babylonjs';
import {Inject} from '@colonial-space/core/injector/inject';
import {Model} from '@colonial-space/core/module/scene/model/model-elements/model';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {SceneGuiManager} from '@colonial-space/core/module/scene/gui/scene-gui-manager';
import {Subject, tap} from 'rxjs';
import {UnitSignIconContainer} from './unit-sign-icon.container';
import {UnitState} from '../../../../game-logic/store/unit/unit.state';

export class UnitSignModel extends Model<BABYLON.Mesh> implements OnInit {
    @Inject(SceneGuiManager) private sceneGuiManager: SceneGuiManager;
    @Inject(SCENE) private scene: BABYLON.Scene;

    public unitSignIconControl: UnitSignIconContainer;
    public clicked$ = new Subject<void>();

    constructor(private unitState: UnitState) {
        super();
    }

    public gameOnInit(): void {
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

        this.sceneGuiManager.createForMesh('UnitSignModel', this.mesh, this.unitSignIconControl);
    }
}
