import * as GUI from 'babylonjs-gui';
import {ControlEvent} from '@colonial-space/core/module/scene/gui/gui-elements/events/control-event';
import {ControlEventListener} from '@colonial-space/core/module/scene/gui/gui-elements/events/control-event-listener';
import {GuiControl} from '@colonial-space/core/module/scene/gui/gui-elements/gui-control';
import {GuiElement} from '@colonial-space/core/module/scene/gui/gui-elements/gui-element';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {TourService} from '../../../../game-logic/tour/tour.service';

@GuiElement()
export class NextTourGuiElement implements GuiControl<GUI.Button>, OnInit {
    @Inject(TourService) private tourService: TourService;
    
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
        this.tourService.nextTour();
    }
}
