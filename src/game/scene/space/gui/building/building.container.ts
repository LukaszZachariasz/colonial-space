import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../engine/lifecycle/after-created/after-created';
import {AppendControl} from '../../../../../engine/gui-manager/gui-elements/append-control/append-control';
import {BuildingHeaderContainer} from './building-header/building-header.container';
import {BuildingScopesStackPanel} from './building-scopes/building-scopes.stack-panel';
import {BuildingState} from '../../../../logic/store/building/building.state';
import {GuiControl} from '../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../engine/gui-manager/gui-elements/gui-element';
import {logic} from '../../../../game';
import {selectBuildingById} from '../../../../logic/store/building/building.selector';

@GuiElement()
export class BuildingContainer implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('buildingContainer');
    public buildingState: BuildingState = selectBuildingById(logic().selectedBuildingService.selectedBuildingId$.value);

    @AppendControl() public scrollViewer: GUI.ScrollViewer = new GUI.ScrollViewer('sectorsScrollViewer');
    @AppendControl() public buildingHeaderContainer: BuildingHeaderContainer = new BuildingHeaderContainer(this.buildingState);
    public buildingScopesStackPanel: BuildingScopesStackPanel = new BuildingScopesStackPanel(this.buildingState);

    constructor() {
    }

    public gameAfterCreated(): void {
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
        this.scrollViewer.addControl(this.buildingScopesStackPanel.control);
    }
}
