import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {AppendControl} from '../../../../../../engine/gui-manager/gui-elements/append-control/append-control';
import {ControlEvent} from '../../../../../../engine/gui-manager/gui-elements/events/control-event';
import {ControlEventListener} from '../../../../../../engine/gui-manager/gui-elements/events/control-event-listener';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {IconControl} from '../icon/icon.control';
import {OnDestroy} from '../../../../../../engine/lifecycle/on-destroy/on-destroy';
import {TooltipContainer} from '../tooltip/tooltip.container';
import {guiManager} from 'engine';

@GuiElement()
export class AttributeContainer implements GuiControl<GUI.Container>, AfterCreated, OnDestroy {
    public control = new GUI.Container('attribute');

    @AppendControl() public iconControl: IconControl;
    public tooltipContainer: TooltipContainer;

    constructor(iconControl: IconControl,
                public tooltipContent: GuiControl<GUI.Control>) {
        this.iconControl = iconControl;
    }

    public gameAfterCreated(): void {
        this.control.adaptHeightToChildren = true;
        this.control.adaptWidthToChildren = true;
    }

    @ControlEventListener(ControlEvent.ON_POINTER_ENTER)
    public showTooltip(control: any, eventState: BABYLON.EventState): void {
        this.tooltipContainer = new TooltipContainer(this.tooltipContent);
        this.tooltipContainer.control.left = eventState.userInfo.localPosition.x + 10 + 'px';
        this.tooltipContainer.control.top = eventState.userInfo.localPosition.y + 'px';
        guiManager().appendToRoot(this.tooltipContainer);
    }
    
    @ControlEventListener(ControlEvent.ON_POINTER_MOVE)
    public setTooltipPosition(position: BABYLON.Vector2): void {
        if (!this.tooltipContainer) {
            return;
        }
        this.tooltipContainer.control.left = position.x + 10 + 'px';
        this.tooltipContainer.control.top = position.y + 'px';
    }
    
    @ControlEventListener(ControlEvent.ON_POINTER_OUT)
    public removeTooltip(): void {
        this.tooltipContainer.control.dispose();
    }

    public gameOnDestroy(): void {
        this.tooltipContainer?.control.dispose();
    }
}
