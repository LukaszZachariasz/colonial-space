import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../../../../../core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {BuildingObjectArtGuiComponent} from './building-object-art/building-object-art.gui-component';
import {BuildingObjectNameGuiComponent} from './building-object-name/building-object-name.gui-component';
import {BuildingObjectProductionGuiComponent} from './building-object-production/building-object-production.gui-component';
import {BuildingObjectSelectGuiComponent} from './building-object-select/building-object-select.gui-component';
import {
    BuildingObjectState
} from '../../../../../../../game-logic/store/building/building-scope/building-object/building-object.state';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '../../../../../../../../../core/module/scene/gui/gui-component/gui-control';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';

@GuiComponent()
export class BuildingObjectGuiComponent implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('object');

    @AppendGuiControl() public buildingObjectName: BuildingObjectNameGuiComponent = new BuildingObjectNameGuiComponent(this.object);
    @AppendGuiControl() public buildingObjectProduction: BuildingObjectProductionGuiComponent = new BuildingObjectProductionGuiComponent(this.object);
    @AppendGuiControl() public buildingObjectArt: BuildingObjectArtGuiComponent = new BuildingObjectArtGuiComponent(this.object);
    @AppendGuiControl() public buildingObjectSelect: BuildingObjectSelectGuiComponent = new BuildingObjectSelectGuiComponent(this.object);

    constructor(private object: BuildingObjectState) {
    }

    public gameOnInit(): void {
        this.control.width = '200px';
        this.control.height = '100%';
        this.control.background = 'rgba(255, 0, 0, 0.3)';
    }
}
