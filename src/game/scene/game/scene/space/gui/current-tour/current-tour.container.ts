import * as GUI from 'babylonjs-gui';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {AppendGuiControl} from '../../../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {CurrentTourLabelGuiElement} from './current-tour-label/current-tour-label.gui-element';
import {GuiControl} from '../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../core/gui-manager/gui-elements/gui-element';
import {NextTourGuiElement} from './next-tour/next-tour.gui-element';

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
