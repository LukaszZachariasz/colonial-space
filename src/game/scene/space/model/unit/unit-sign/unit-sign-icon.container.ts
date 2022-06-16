import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {AppendControl} from '../../../../../../engine/gui-manager/gui-elements/append-control/append-control';
import {ControlEvent} from '../../../../../../engine/gui-manager/gui-elements/events/control-event';
import {ControlEventListener} from '../../../../../../engine/gui-manager/gui-elements/events/control-event-listener';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {IconControl} from '../../../gui/shared/icon/icon.control';
import {Subject} from 'rxjs';
import {UnitState} from '../../../../../logic/store/unit/unit.state';

@GuiElement()
export class UnitSignIconContainer implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('unitSignIcon');
    public clicked$ = new Subject<void>();
    
    @AppendControl() public iconControl: IconControl = new IconControl(this.unitState.icon);

    constructor(private unitState: UnitState) {
    }

    public gameAfterCreated(): void {
        this.control.widthInPixels = 1024;
        this.control.heightInPixels = 1024;
        this.iconControl.control.widthInPixels = 1024;
        this.iconControl.control.heightInPixels = 1024;
    }

    @ControlEventListener(ControlEvent.ON_POINTER_DOWN)
    public pointerDown(): void {
        this.clicked$.next();
    }
}
