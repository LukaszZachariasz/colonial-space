import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {ControlEvent} from '../../../../../../engine/gui-manager/gui-elements/events/control-event';
import {ControlEventListener} from '../../../../../../engine/gui-manager/gui-elements/events/control-event-listener';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';

@GuiElement()
export class ButtonControl implements GuiControl<GUI.Button>, AfterCreated {
    public control = GUI.Button.CreateSimpleButton(this.text, this.text);
    
    constructor(private text: string,
                private onClick: (eventData?: GUI.Vector2WithInfo, eventState?: BABYLON.EventState) => void) {
    }

    public gameAfterCreated(): void {
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
