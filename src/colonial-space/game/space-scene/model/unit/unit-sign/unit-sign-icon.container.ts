import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '@colonial-space/core/scene-manager/gui/gui-elements/append-gui-control/append-gui-control';
import {ControlEvent} from '@colonial-space/core/scene-manager/gui/gui-elements/events/control-event';
import {ControlEventListener} from '@colonial-space/core/scene-manager/gui/gui-elements/events/control-event-listener';
import {GuiControl} from '@colonial-space/core/scene-manager/gui/gui-elements/gui-control';
import {IconGuiElement} from '../../../gui/shared/icon/icon.gui-element';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {Subject} from 'rxjs';
import {UnitState} from '../../../../game-logic/store/unit/unit.state';

export class UnitSignIconContainer implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('unitSignIcon');
    public clicked$ = new Subject<void>();
    
    @AppendGuiControl() public iconControl: IconGuiElement = new IconGuiElement(this.unitState.icon);

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
