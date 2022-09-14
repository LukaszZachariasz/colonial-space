import * as GUI from 'babylonjs-gui';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {
    BuildingObjectState
} from '../../../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {GuiControl} from '../../../../../../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../../../../../core/gui-manager/gui-elements/gui-element';

@GuiElement()
export class BuildingObjectArtGuiElement implements GuiControl<GUI.Image>, OnInit {
    public control = new GUI.Image('art', this.buildingObjectState.artUrl);

    constructor(private buildingObjectState: BuildingObjectState) {
    }

    public gameOnInit(): void {
        this.control.width = '70px';
        this.control.height = '70px';
        this.control.top = '10%';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    }
}
