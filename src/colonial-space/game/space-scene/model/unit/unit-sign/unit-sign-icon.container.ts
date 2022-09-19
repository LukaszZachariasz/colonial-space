import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '@colonial-space/core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {ControlEvent} from '@colonial-space/core/module/scene/gui/gui-component/events/control-event';
import {ControlEventListener} from '@colonial-space/core/module/scene/gui/gui-component/events/control-event-listener';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '@colonial-space/core/module/scene/gui/gui-component/gui-control';
import {IconGuiComponent} from '../../../gui/shared/icon/icon.gui-component';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {Subject} from 'rxjs';
import {UnitState} from '../../../../game-logic/store/unit/unit.state';

@GuiComponent()
export class UnitSignIconContainer implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('unitSignIcon');
    public clicked$ = new Subject<void>();
    
    @AppendGuiControl() public iconControl: IconGuiComponent = new IconGuiComponent(this.unitState.icon);

    constructor(private unitState: UnitState) {
    }

    public gameOnInit(): void {
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
