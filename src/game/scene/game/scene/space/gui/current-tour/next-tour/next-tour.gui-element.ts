import * as GUI from 'babylonjs-gui';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {Container} from 'typedi';
import {ControlEvent} from '../../../../../../../core/gui-manager/gui-elements/events/control-event';
import {ControlEventListener} from '../../../../../../../core/gui-manager/gui-elements/events/control-event-listener';
import {GuiControl} from '../../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../core/gui-manager/gui-elements/gui-element';
import {TourService} from '../../../../../logic/services/tour/tour.service';

@GuiElement()
export class NextTourGuiElement implements GuiControl<GUI.Button>, OnInit {
    public control = GUI.Button.CreateSimpleButton('nextTour', 'Next tour');

    public gameOnInit(): void {
        this.control.width = '100px';
        this.control.height = '50px';
        this.control.color = 'red';
        this.control.background = 'black';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
    }

    @ControlEventListener(ControlEvent.ON_POINTER_UP)
    public nextTour(): void {
        Container.get(TourService).nextTour();
    }
}