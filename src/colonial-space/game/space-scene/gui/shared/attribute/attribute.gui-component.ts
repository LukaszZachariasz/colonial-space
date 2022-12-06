import * as BABYLON from 'babylonjs';
import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../../core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {ControlEvent} from '../../../../../../core/module/scene/gui/gui-component/events/control-event';
import {ControlEventListener} from '../../../../../../core/module/scene/gui/gui-component/events/control-event-listener';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '../../../../../../core/module/scene/gui/gui-component/gui-control';
import {IconGuiComponent} from '../icon/icon.gui-component';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SceneGuiManager} from '@colonial-space/core/module/scene/gui/scene-gui-manager';
import {TooltipGuiComponent} from '../tooltip/tooltip.gui-component';

@GuiComponent()
export class AttributeGuiComponent implements GuiControl<GUI.Container>, OnInit, OnDestroy {
    @Inject(SceneGuiManager) private guiManager: SceneGuiManager;
    
    public control = new GUI.Container('attribute');

    @AppendGuiControl() public iconControl: IconGuiComponent;
    public tooltip: TooltipGuiComponent;

    constructor(iconControl: IconGuiComponent,
                public tooltipContent: GuiControl) {
        this.iconControl = iconControl;
    }

    public gameOnInit(): void {
        this.control.adaptHeightToChildren = true;
        this.control.adaptWidthToChildren = true;
    }

    @ControlEventListener(ControlEvent.ON_POINTER_ENTER)
    public showTooltip(control: any, eventState: BABYLON.EventState): void {
        this.tooltip = new TooltipGuiComponent(this.tooltipContent);
        this.tooltip.control.left = eventState.userInfo.localPosition.x + 10 + 'px';
        this.tooltip.control.top = eventState.userInfo.localPosition.y + 'px';
        this.guiManager.appendToRoot(this.tooltip);
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
