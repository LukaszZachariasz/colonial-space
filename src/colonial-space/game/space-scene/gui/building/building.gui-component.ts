import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {BuildingHeaderGuiComponent} from './building-header/building-header.gui-component';
import {BuildingScopesGuiComponent} from './building-scopes/building-scopes.gui-component';
import {BuildingState} from '../../../game-logic/store/building/building.state';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '../../../../../core/module/scene/gui/gui-component/gui-control';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SelectionBuildingService} from '../../../game-logic/selection/building/selection-building.service';
import {selectBuildingById} from '../../../game-logic/store/building/building.selector';

@GuiComponent()
export class BuildingGuiComponent implements GuiControl<GUI.Container>, OnInit {
    @Inject(SelectionBuildingService) private selectionBuildingService!: SelectionBuildingService;
    public control: GUI.Container = new GUI.Container('buildingContainer');
    public buildingState: BuildingState = selectBuildingById(this.selectionBuildingService.selectedBuildingId$.value);

    @AppendGuiControl() public buildingHeader: BuildingHeaderGuiComponent = new BuildingHeaderGuiComponent(this.buildingState);
    @AppendGuiControl() public scrollViewer: GUI.ScrollViewer = new GUI.ScrollViewer('sectorsScrollViewer');
    @AppendGuiControl('scrollViewer') public buildingScopes: BuildingScopesGuiComponent = new BuildingScopesGuiComponent(this.buildingState);

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
