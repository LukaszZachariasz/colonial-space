import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '@colonial-space/core/lifecycle/after-created/after-created';
import {AppendGuiControl} from '../../../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {Container} from 'typedi';
import {ControlEvent} from '../../../../../../core/gui-manager/gui-elements/events/control-event';
import {ControlEventListener} from '../../../../../../core/gui-manager/gui-elements/events/control-event-listener';
import {GuiControl} from '../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../core/gui-manager/gui-elements/gui-element';
import {GuiManagerService} from '../../../../../../core/gui-manager/gui-manager.service';
import {IconGuiElement} from '../icon/icon.gui-element';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {TooltipGuiElement} from '../tooltip/tooltip.gui-element';

@GuiElement()
export class AttributeGuiElement implements GuiControl<GUI.Container>, AfterCreated, OnDestroy {
    public control = new GUI.Container('attribute');

    @AppendGuiControl() public iconControl: IconGuiElement;
    public tooltip: TooltipGuiElement;

    constructor(iconControl: IconGuiElement,
                public tooltipContent: GuiControl<GUI.Control>) {
        this.iconControl = iconControl;
    }

    public gameAfterCreated(): void {
        this.control.adaptHeightToChildren = true;
        this.control.adaptWidthToChildren = true;
    }

    @ControlEventListener(ControlEvent.ON_POINTER_ENTER)
    public showTooltip(control: any, eventState: BABYLON.EventState): void {
        this.tooltip = new TooltipGuiElement(this.tooltipContent);
        this.tooltip.control.left = eventState.userInfo.localPosition.x + 10 + 'px';
        this.tooltip.control.top = eventState.userInfo.localPosition.y + 'px';
        Container.get(GuiManagerService).appendToRoot(this.tooltip);
    }
    
    @ControlEventListener(ControlEvent.ON_POINTER_MOVE)
    public setTooltipPosition(position: BABYLON.Vector2): void {
        if (!this.tooltip) {
            return;
        }
        this.tooltip.control.left = position.x + 10 + 'px';
        this.tooltip.control.top = position.y + 'px';
    }
    
    @ControlEventListener(ControlEvent.ON_POINTER_OUT)
    public removeTooltip(): void {
        this.tooltip.control.dispose();
    }

    public gameOnDestroy(): void {
        this.tooltip?.control.dispose();
    }
}