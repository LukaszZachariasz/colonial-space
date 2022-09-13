import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../engine/lifecycle/after-created/after-created';
import {
    AppendGuiControl
} from '../../../../../../../engine/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {FromAboveCamera} from '../../../../camera/from-above-camera';
import {GuiControl} from '../../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {IconGuiElement} from '../../../shared/icon/icon.gui-element';
import {OnDestroy} from '../../../../../../../engine/lifecycle/on-destroy/on-destroy';
import {SquareState} from '../../../../../../logic/store/map/square/square.state';
import {Subscription, filter, merge, tap} from 'rxjs';
import {UnitState} from '../../../../../../logic/store/unit/unit.state';
import {logic} from '../../../../../../game';
import {sceneManager} from 'engine';
import {selectSquareByUnitId} from '../../../../../../logic/store/map/square/square.selectors';
import {selectUnitById} from '../../../../../../logic/store/unit/unit.selectors';

@GuiElement()
export class MinimapUnitGuiElement implements GuiControl<GUI.Container>, AfterCreated, OnDestroy {
    public control: GUI.Container = new GUI.Container('minimapUnit');
    public unitState: UnitState = selectUnitById(this.squareState.unitId);

    @AppendGuiControl() public icon: IconGuiElement = new IconGuiElement(this.unitState.icon);

    private camera: FromAboveCamera = sceneManager().currentCamera as FromAboveCamera;

    private unitMovementSubscription: Subscription;

    constructor(private squareState: SquareState) {
    }

    public gameAfterCreated(): void {
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
            logic().unitMovementService.moveUnit$.pipe(
                filter((id: string) => this.unitState.id === id)
            ),
            logic().tourService.completeTour$
        ).pipe(
            tap(() => this.unitState = selectUnitById(this.unitState.id)),
            tap(() => this.squareState = selectSquareByUnitId(this.unitState.id)),
            tap(() => this.setPosition())
        ).subscribe();

        logic().unitService.removeUnitId$.pipe(
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