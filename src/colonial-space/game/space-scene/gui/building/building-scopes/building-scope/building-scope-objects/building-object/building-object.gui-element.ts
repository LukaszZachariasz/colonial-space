import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {BuildingObjectArtGuiElement} from './building-object-art/building-object-art.gui-element';
import {BuildingObjectNameGuiElement} from './building-object-name/building-object-name.gui-element';
import {BuildingObjectProductionGuiElement} from './building-object-production/building-object-production.gui-element';
import {BuildingObjectSelectGuiElement} from './building-object-select/building-object-select.gui-element';
import {
    BuildingObjectState
} from '../../../../../../../game-logic/store/building/building-scope/building-object/building-object.state';
import {GuiControl} from '../../../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../../core/gui-manager/gui-elements/gui-element';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';

@GuiElement()
export class BuildingObjectGuiElement implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('object');

    @AppendGuiControl() public buildingObjectName: BuildingObjectNameGuiElement = new BuildingObjectNameGuiElement(this.object);
    @AppendGuiControl() public buildingObjectProduction: BuildingObjectProductionGuiElement = new BuildingObjectProductionGuiElement(this.object);
    @AppendGuiControl() public buildingObjectArt: BuildingObjectArtGuiElement = new BuildingObjectArtGuiElement(this.object);
    @AppendGuiControl() public buildingObjectSelect: BuildingObjectSelectGuiElement = new BuildingObjectSelectGuiElement(this.object);

    constructor(private object: BuildingObjectState) {
    }

    public gameOnInit(): void {
        this.control.width = '200px';
        this.control.height = '100%';
        this.control.background = 'rgba(255, 0, 0, 0.3)';
    }
}
