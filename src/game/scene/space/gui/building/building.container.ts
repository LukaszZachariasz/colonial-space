import * as GUI from 'babylonjs-gui';
import {BuildingHeaderContainer} from './building-header/building-header.container';
import {BuildingScopesStackPanel} from './building-scopes/building-scopes.stack-panel';
import {BuildingState} from '../../../../logic/store/building/building.state';
import {Container} from '../../../../../engine/gui-manager/gui-elements/elements/container/container';
import {GuiElement} from '../../../../../engine/gui-manager/gui-elements/gui-element';
import {ScrollViewerGui} from '../../../../../engine/gui-manager/gui-elements/elements/scroll-viewer/scroll-viewer-gui';
import {logic} from '../../../../game';
import {selectBuildingById} from '../../../../logic/store/building/building.selector';

@GuiElement()
export class BuildingContainer extends Container {
    public scrollViewer: ScrollViewerGui;
    public buildingHeaderContainer: BuildingHeaderContainer;
    public buildingScopesStackPanel: BuildingScopesStackPanel;

    private buildingState: BuildingState = selectBuildingById(logic().selectedBuildingService.selectedBuildingId$.value);

    constructor() {
        super('buildingContainer');
    }

    public onCreate(): void {
        super.onCreate();
        this.control.background = 'rgba(0, 0, 0, 0.4)';
        this.control.width = '60%';
        this.control.height = '65%';
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.control.isPointerBlocker = true;

        this.scrollViewer = new ScrollViewerGui('sectorsScrollViewer');
        this.scrollViewer.control.width = '100%';
        this.scrollViewer.control.top = '10%';
        this.scrollViewer.control.height = '90%';
        this.scrollViewer.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.scrollViewer.control.thickness = 0;
        this.addControlToContainer(this.scrollViewer);

        this.buildingHeaderContainer = new BuildingHeaderContainer(this.buildingState);
        this.addControlToContainer(this.buildingHeaderContainer);

        this.buildingScopesStackPanel = new BuildingScopesStackPanel(this.buildingState);
        this.scrollViewer.addControlToScrollViewer(this.buildingScopesStackPanel);
    }
}
