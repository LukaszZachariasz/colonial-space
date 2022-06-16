import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../../../engine/lifecycle/after-created/after-created';
import {AppendControl} from '../../../../../../../../../engine/gui-manager/gui-elements/append-control/append-control';
import {BuildingObjectArtControl} from './building-object-art/building-object-art.control';
import {BuildingObjectNameContainer} from './building-object-name/building-object-name.container';
import {BuildingObjectProductionContainer} from './building-object-production/building-object-production.container';
import {BuildingObjectSelectControl} from './building-object-select/building-object-select.control';
import {
    BuildingObjectState
} from '../../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {GuiControl} from '../../../../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../../../engine/gui-manager/gui-elements/gui-element';

@GuiElement()
export class BuildingObjectContainer implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('object');

    @AppendControl() public buildingObjectNameContainer: BuildingObjectNameContainer = new BuildingObjectNameContainer(this.object);
    @AppendControl() public buildingObjectProductionContainer: BuildingObjectProductionContainer = new BuildingObjectProductionContainer(this.object);
    @AppendControl() public buildingObjectArtControl: BuildingObjectArtControl = new BuildingObjectArtControl(this.object);
    @AppendControl() public buildingObjectSelectControl: BuildingObjectSelectControl = new BuildingObjectSelectControl(this.object);

    constructor(private object: BuildingObjectState) {
    }

    public gameAfterCreated(): void {
        this.control.width = '200px';
        this.control.height = '100%';
        this.control.background = 'rgba(255, 0, 0, 0.3)';
    }
}
