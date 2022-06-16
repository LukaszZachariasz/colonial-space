import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {ControlEvent} from '../../../../../../engine/gui-manager/gui-elements/events/control-event';
import {ControlEventListener} from '../../../../../../engine/gui-manager/gui-elements/events/control-event-listener';
import {GuiContainer} from '../../../../../../engine/gui-manager/gui-elements/advanced-controls/gui-container/gui-container';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {IconControl} from '../../../gui/shared/icon/icon.control';
import {Subject} from 'rxjs';
import {UnitState} from '../../../../../logic/store/unit/unit.state';

@GuiElement()
export class UnitSignIconContainer extends GuiContainer implements AfterCreated {
    public iconControl: IconControl;
    public clicked$ = new Subject<void>();

    constructor(private unitState: UnitState) {
        super('unitSignIcon');
    }

    public gameAfterCreated(): void {
        this.control.widthInPixels = 1024;
        this.control.heightInPixels = 1024;

        this.iconControl = new IconControl(this.unitState.icon);
        this.iconControl.control.widthInPixels = 1024;
        this.iconControl.control.heightInPixels = 1024;
        this.addControlToContainer(this.iconControl);
    }

    @ControlEventListener(ControlEvent.ON_POINTER_DOWN)
    public pointerDown(): void {
        this.clicked$.next();
    }
}
