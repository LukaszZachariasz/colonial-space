import * as GUI from 'babylonjs-gui';
import {ControlEvent} from '../../../../core/module/scene/gui/gui-component/events/control-event';
import {ControlEventListener} from '../../../../core/module/scene/gui/gui-component/events/control-event-listener';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '../../../../core/module/scene/gui/gui-component/gui-control';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {Subject} from 'rxjs';

@GuiComponent()
export class MainMenuBeginBtnGuiComponent implements GuiControl<GUI.Button>, OnInit {
    public control = GUI.Button.CreateImageOnlyButton('MainMenuBeginBtnControl', 'resources/gui/main-menu/buttons/mm-begin-btn-idle.svg');
    public onClick$ = new Subject<void>();

    public gameOnInit(): void {
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.control.paddingLeftInPixels = 20;
        this.control.color = 'transparent';
        this.control.heightInPixels = 60;
        this.control.widthInPixels = 500;
        this.control.leftInPixels = 40;
        this.control.topInPixels = -290;
    }

    @ControlEventListener(ControlEvent.ON_POINTER_CLICK)
    public onClick(): void {
        this.onClick$.next();
    }

    @ControlEventListener(ControlEvent.ON_POINTER_ENTER)
    public onPointerEnter(): void {
        this.control.image.source = 'resources/gui/main-menu/buttons/mm-begin-btn-hover.svg';
    }

    @ControlEventListener(ControlEvent.ON_POINTER_OUT)
    public onPointerOut(): void {
        this.control.image.source = 'resources/gui/main-menu/buttons/mm-begin-btn-idle.svg';
    }
}
