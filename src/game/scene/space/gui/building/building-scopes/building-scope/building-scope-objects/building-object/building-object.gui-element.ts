import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../../../engine/lifecycle/after-created/after-created';
import {AppendGuiControl} from '../../../../../../../../../engine/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {BuildingObjectArtGuiElement} from './building-object-art/building-object-art.gui-element';
import {BuildingObjectNameGuiElement} from './building-object-name/building-object-name.gui-element';
import {BuildingObjectProductionGuiElement} from './building-object-production/building-object-production.gui-element';
import {BuildingObjectSelectGuiElement} from './building-object-select/building-object-select.gui-element';
import {
    BuildingObjectState
} from '../../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {GuiControl} from '../../../../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../../../engine/gui-manager/gui-elements/gui-element';

@GuiElement()
export class BuildingObjectGuiElement implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('object');

    @AppendGuiControl() public buildingObjectNameGuiElement: BuildingObjectNameGuiElement = new BuildingObjectNameGuiElement(this.object);
    @AppendGuiControl() public buildingObjectProductionGuiElement: BuildingObjectProductionGuiElement = new BuildingObjectProductionGuiElement(this.object);
    @AppendGuiControl() public buildingObjectArtGuiElement: BuildingObjectArtGuiElement = new BuildingObjectArtGuiElement(this.object);
    @AppendGuiControl() public buildingObjectSelectGuiElement: BuildingObjectSelectGuiElement = new BuildingObjectSelectGuiElement(this.object);

    constructor(private object: BuildingObjectState) {
    }

    public gameAfterCreated(): void {
        this.control.width = '200px';
        this.control.height = '100%';
        this.control.background = 'rgba(255, 0, 0, 0.3)';
    }
}
