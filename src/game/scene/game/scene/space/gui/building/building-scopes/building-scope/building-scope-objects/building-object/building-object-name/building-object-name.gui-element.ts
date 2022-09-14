import * as GUI from 'babylonjs-gui';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {
    AppendGuiControl
} from '../../../../../../../../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {
    BuildingObjectState
} from '../../../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {GuiControl} from '../../../../../../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../../../../../core/gui-manager/gui-elements/gui-element';
import {TextGuiElement} from '../../../../../../shared/text/text.gui-element';

@GuiElement()
export class BuildingObjectNameGuiElement implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('buildingObjectName');
    
    @AppendGuiControl() private text: TextGuiElement = new TextGuiElement(this.buildingObjectState.name.toString());

    constructor(private buildingObjectState: BuildingObjectState) {
    }

    public gameOnInit(): void {
        this.text.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.text.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.text.control.left = '5%';
    }
}
