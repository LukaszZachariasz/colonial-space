import * as GUI from 'babylonjs-gui';
import {ControlEvent} from '../../../../../../core/module/scene/gui/gui-component/events/control-event';
import {ControlEventListener} from '../../../../../../core/module/scene/gui/gui-component/events/control-event-listener';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '../../../../../../core/module/scene/gui/gui-component/gui-control';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';

@GuiComponent()
export class ButtonGuiComponent implements GuiControl<GUI.Button>, OnInit {
    public control = GUI.Button.CreateSimpleButton(this.text, this.text);
    
    constructor(private text: string,
                private onClick: (eventData?: GUI.Vector2WithInfo, eventState?: BABYLON.EventState) => void) {
    }

    public gameOnInit(): void {
        this.control.width = '100px';
        this.control.height = '50px';
        this.control.background = 'rgba(0, 0, 0, 0.3)';
        this.control.color = 'white';
        this.control.fontFamily = 'JuiceRegular';
        this.control.fontSize = '12px';
    }

    @ControlEventListener(ControlEvent.ON_POINTER_CLICK)
    public clicked(eventData: GUI.Vector2WithInfo, eventState: BABYLON.EventState): void {
        this.onClick(eventData, eventState);
    }
}
