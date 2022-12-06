import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '@colonial-space/core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {BuildingState} from '../../../../game-logic/store/building/building.state';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '@colonial-space/core/module/scene/gui/gui-component/gui-control';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {TextGuiComponent} from '../../../../../shared/gui/text/text.gui-component';

@GuiComponent()
export class BuildingHeaderGuiComponent implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('header');
    
    @AppendGuiControl() public title: TextGuiComponent = new TextGuiComponent('Building', {uppercase: true});

    constructor(private buildingState: BuildingState) {
    }

    public gameOnInit(): void {
        this.control.height = '10%';
        this.control.width = '100%';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.title.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
    }
}
