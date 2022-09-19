import * as GUI from 'babylonjs-gui';
import {
    AppendGuiControl
} from '@colonial-space/core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {CAMERA} from '@colonial-space/core/module/scene/camera.token';
import {FromAboveCamera} from '../../../../../../shared/camera/from-above-camera';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '@colonial-space/core/module/scene/gui/gui-component/gui-control';
import {IconGuiComponent} from '../../../shared/icon/icon.gui-component';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SquareState} from '../../../../../game-logic/store/map/square/square.state';
import {Subscription, filter, merge, tap} from 'rxjs';
import {TourService} from '../../../../../game-logic/tour/tour.service';
import {UnitMovementService} from '../../../../../game-logic/unit/unit-movement.service';
import {UnitService} from '../../../../../game-logic/unit/unit.service';
import {UnitState} from '../../../../../game-logic/store/unit/unit.state';
import {selectSquareByUnitId} from '../../../../../game-logic/store/map/square/square.selectors';
import {selectUnitById} from '../../../../../game-logic/store/unit/unit.selectors';

@GuiComponent()
export class MinimapUnitGuiComponent implements GuiControl<GUI.Container>, OnInit, OnDestroy {
    @Inject(UnitMovementService) private unitMovementService: UnitMovementService;
    @Inject(TourService) private tourService: TourService;
    @Inject(UnitService) private unitService: UnitService;
    @Inject(CAMERA) private camera: FromAboveCamera;
    
    public control: GUI.Container = new GUI.Container('minimapUnit');
    public unitState: UnitState = selectUnitById(this.squareState.unitId);

    @AppendGuiControl() public icon: IconGuiComponent = new IconGuiComponent(this.unitState.icon);

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
            this.unitMovementService.moveUnit$.pipe(
                filter((id: string) => this.unitState.id === id)
            ),
            this.tourService.completeTour$
        ).pipe(
            tap(() => this.unitState = selectUnitById(this.unitState.id)),
            tap(() => this.squareState = selectSquareByUnitId(this.unitState.id)),
            tap(() => this.setPosition())
        ).subscribe();

        this.unitService.removeUnitId$.pipe(
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
