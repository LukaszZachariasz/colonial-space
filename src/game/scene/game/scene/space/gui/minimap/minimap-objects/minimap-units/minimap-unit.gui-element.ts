import * as GUI from 'babylonjs-gui';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {
    AppendGuiControl
} from '../../../../../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {Container} from 'typedi';
import {FromAboveCamera} from '../../../../camera/from-above-camera';
import {GuiControl} from '../../../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../../core/gui-manager/gui-elements/gui-element';
import {IconGuiElement} from '../../../shared/icon/icon.gui-element';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {SceneManagerService} from '../../../../../../../../core/scene-manager/scene-manager.service';
import {SquareState} from '../../../../../../logic/store/map/square/square.state';
import {Subscription, filter, merge, tap} from 'rxjs';
import {TourService} from '../../../../../../logic/services/tour/tour.service';
import {UnitMovementService} from '../../../../../../logic/services/unit/unit-movement.service';
import {UnitService} from '../../../../../../logic/services/unit/unit.service';
import {UnitState} from '../../../../../../logic/store/unit/unit.state';
import {selectSquareByUnitId} from '../../../../../../logic/store/map/square/square.selectors';
import {selectUnitById} from '../../../../../../logic/store/unit/unit.selectors';

@GuiElement()
export class MinimapUnitGuiElement implements GuiControl<GUI.Container>, OnInit, OnDestroy {
    public control: GUI.Container = new GUI.Container('minimapUnit');
    public unitState: UnitState = selectUnitById(this.squareState.unitId);

    @AppendGuiControl() public icon: IconGuiElement = new IconGuiElement(this.unitState.icon);

    private camera: FromAboveCamera = Container.get(SceneManagerService).currentCamera as FromAboveCamera;

    private unitMovementSubscription: Subscription;

    constructor(private squareState: SquareState) {
    }

    public gameOnInit(): void {
        this.control.width = '15px';
        this.control.height = '15px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.control.alpha = 0.99;
        this.control.zIndex = 999;
        this.icon.control.width = '15px';
        this.icon.control.height = '15px';
        this.setPosition();

        this.unitMovementSubscription = merge(
            Container.get(UnitMovementService).moveUnit$.pipe(
                filter((id: string) => this.unitState.id === id)
            ),
            Container.get(TourService).completeTour$
        ).pipe(
            tap(() => this.unitState = selectUnitById(this.unitState.id)),
            tap(() => this.squareState = selectSquareByUnitId(this.unitState.id)),
            tap(() => this.setPosition())
        ).subscribe();

        Container.get(UnitService).removeUnitId$.pipe(
            filter((id: string) => this.unitState.id === id),
            tap(() => this.control.dispose())
        ).subscribe();
    }

    public setPosition(): void {
        this.control.left = (this.squareState.x * 100) / this.camera.maxRight - 1 + '%';
        this.control.top = (this.squareState.y * 100) / this.camera.maxBottom - 1 + '%';
    }

    public gameOnDestroy(): void {
        this.unitMovementSubscription?.unsubscribe();
    }
}