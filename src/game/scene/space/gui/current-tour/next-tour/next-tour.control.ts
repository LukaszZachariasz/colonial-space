import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {ControlEvent} from '../../../../../../engine/gui-manager/gui-elements/events/control-event';
import {ControlEventListener} from '../../../../../../engine/gui-manager/gui-elements/events/control-event-listener';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {logic} from '../../../../../game';

@GuiElement()
export class NextTourControl implements GuiControl<GUI.Button>, AfterCreated {
    public control = GUI.Button.CreateSimpleButton('nextTour', 'Next tour');

    public gameAfterCreated(): void {
        this.control.width = '100px';
        this.control.height = '50px';
        this.control.color = 'red';
        this.control.background = 'black';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    }

    @ControlEventListener(ControlEvent.ON_POINTER_UP)
    public nextTour(): void {
        logic().tourService.nextTour();
    }
}
