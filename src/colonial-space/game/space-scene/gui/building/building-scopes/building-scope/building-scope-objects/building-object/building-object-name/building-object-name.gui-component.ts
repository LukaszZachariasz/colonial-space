import * as GUI from 'babylonjs-gui';
import {
    AppendGuiControl
} from '../../../../../../../../../../core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {
    BuildingObjectState
} from '../../../../../../../../game-logic/store/building/building-scope/building-object/building-object.state';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '../../../../../../../../../../core/module/scene/gui/gui-component/gui-control';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {TextGuiComponent} from '../../../../../../../../../shared/gui/text/text.gui-component';

@GuiComponent()
export class BuildingObjectNameGuiComponent implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('buildingObjectName');
    
    @AppendGuiControl() private text: TextGuiComponent = new TextGuiComponent(this.buildingObjectState.name.toString());

    constructor(private buildingObjectState: BuildingObjectState) {
    }

    public gameOnInit(): void {
        this.text.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.text.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.text.control.left = '5%';
    }
}
