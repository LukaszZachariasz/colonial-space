import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/gui-elements/elements/control';
import {ControlEvent} from '../../../../../../engine/gui-manager/gui-elements/events/control-event';
import {ControlEventListener} from '../../../../../../engine/gui-manager/gui-elements/events/control-event-listener';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';

@GuiElement()
export class ButtonControl extends Control<GUI.Button> {
    constructor(private text: string,
                private onClick: (eventData?: GUI.Vector2WithInfo, eventState?: BABYLON.EventState) => void) {
        super();
    }

    public onCreate(): void {
        this.control = GUI.Button.CreateSimpleButton(this.text, this.text);
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
