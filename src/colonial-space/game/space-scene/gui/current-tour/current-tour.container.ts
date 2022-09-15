import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../core/scene-manager/gui/gui-elements/append-gui-control/append-gui-control';
import {CurrentTourLabelGuiElement} from './current-tour-label/current-tour-label.gui-element';
import {GuiControl} from '../../../../../core/scene-manager/gui/gui-elements/gui-control';
import {GuiElement} from '../../../../../core/scene-manager/gui/gui-elements/gui-element';
import {NextTourGuiElement} from './next-tour/next-tour.gui-element';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';

@GuiElement()
export class CurrentTourContainer implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('currentTourBar');

    @AppendGuiControl() public currentTourLabel: CurrentTourLabelGuiElement = new CurrentTourLabelGuiElement();
    @AppendGuiControl() public nextTour: NextTourGuiElement = new NextTourGuiElement();

    public gameOnInit(): void {
        this.control.width = '200px';
        this.control.height = '150px';
        this.control.top = '-60px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    }
}
