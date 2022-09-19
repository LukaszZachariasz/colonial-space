import * as GUI from 'babylonjs-gui';
import {
    BuildingObjectState
} from '../../../../../../../../game-logic/store/building/building-scope/building-object/building-object.state';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '../../../../../../../../../../core/module/scene/gui/gui-component/gui-control';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';

@GuiComponent()
export class BuildingObjectArtGuiComponent implements GuiControl<GUI.Image>, OnInit {
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
