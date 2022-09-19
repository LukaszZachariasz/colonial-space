import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {CurrentTourLabelGuiComponent} from './current-tour-label/current-tour-label.gui-component';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '../../../../../core/module/scene/gui/gui-component/gui-control';
import {NextTourGuiComponent} from './next-tour/next-tour.gui-component';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';

@GuiComponent()
export class CurrentTourGuiComponent implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('currentTourBar');

    @AppendGuiControl() public currentTourLabel: CurrentTourLabelGuiComponent = new CurrentTourLabelGuiComponent();
    @AppendGuiControl() public nextTour: NextTourGuiComponent = new NextTourGuiComponent();

    public gameOnInit(): void {
        this.control.width = '200px';
        this.control.height = '150px';
        this.control.top = '-60px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
    }
}
