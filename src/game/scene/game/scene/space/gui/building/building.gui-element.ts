import * as GUI from 'babylonjs-gui';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {AppendGuiControl} from '../../../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {BuildingHeaderGuiElement} from './building-header/building-header.gui-element';
import {BuildingScopesGuiElement} from './building-scopes/building-scopes.gui-element';
import {BuildingState} from '../../../../logic/store/building/building.state';
import {Container} from 'typedi';
import {GuiControl} from '../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../core/gui-manager/gui-elements/gui-element';
import {SelectedBuildingService} from '../../../../logic/services/building/selected-building.service';
import {selectBuildingById} from '../../../../logic/store/building/building.selector';

@GuiElement()
export class BuildingGuiElement implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('buildingContainer');
    public buildingState: BuildingState = selectBuildingById(Container.get(SelectedBuildingService).selectedBuildingId$.value);

    @AppendGuiControl() public buildingHeader: BuildingHeaderGuiElement = new BuildingHeaderGuiElement(this.buildingState);
    @AppendGuiControl() public scrollViewer: GUI.ScrollViewer = new GUI.ScrollViewer('sectorsScrollViewer');
    @AppendGuiControl({
        parent: 'scrollViewer'
    }) public buildingScopes: BuildingScopesGuiElement = new BuildingScopesGuiElement(this.buildingState);

    constructor() {
    }

    public gameOnInit(): void {
        this.control.background = 'rgba(0, 0, 0, 0.4)';
        this.control.width = '60%';
        this.control.height = '65%';
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.control.isPointerBlocker = true;

        this.scrollViewer.width = '100%';
        this.scrollViewer.top = '10%';
        this.scrollViewer.height = '90%';
        this.scrollViewer.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.scrollViewer.thickness = 0;
    }
}
