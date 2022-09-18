import * as GUI from 'babylonjs-gui';
import {ControlEvent} from '../../../../core/module/scene/gui/gui-elements/events/control-event';
import {ControlEventListener} from '../../../../core/module/scene/gui/gui-elements/events/control-event-listener';
import {GuiControl} from '../../../../core/module/scene/gui/gui-elements/gui-control';
import {GuiElement} from '../../../../core/module/scene/gui/gui-elements/gui-element';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {Subject} from 'rxjs';

@GuiElement()
export class MainMenuLoadBtnControl implements GuiControl<GUI.Button>, OnInit {
    public control = GUI.Button.CreateImageOnlyButton('MainMenuLoadBtnControl', 'resources/gui/main-menu/buttons/mm-load-btn-idle.svg');
    public onClick$ = new Subject<void>();

    public gameOnInit(): void {
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.control.paddingLeftInPixels = 20;
        this.control.color = 'transparent';
        this.control.heightInPixels = 60;
        this.control.widthInPixels = 500;
        this.control.leftInPixels = 40;
        this.control.topInPixels = -210;
    }

    @ControlEventListener(ControlEvent.ON_POINTER_CLICK)
    public onClick(): void {
        this.onClick$.next();
    }

    @ControlEventListener(ControlEvent.ON_POINTER_ENTER)
    public onPointerEnter(): void {
        this.control.image.source = 'resources/gui/main-menu/buttons/mm-load-btn-hover.svg';
    }

    @ControlEventListener(ControlEvent.ON_POINTER_OUT)
    public onPointerOut(): void {
        this.control.image.source = 'resources/gui/main-menu/buttons/mm-load-btn-idle.svg';
    }
}
