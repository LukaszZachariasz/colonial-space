import * as GUI from 'babylonjs-gui';
import {BuildingHeaderContainer} from './building-header/building-header.container';
import {BuildingScopesStackPanel} from './building-scopes/building-scopes.stack-panel';
import {BuildingState} from '../../../../logic/store/building/building.state';
import {Container} from '../../../../../engine/gui-manager/gui-elements/container';
import {ScrollViewer} from '../../../../../engine/gui-manager/gui-elements/scroll-viewer';
import {logic} from '../../../../game';
import {selectBuildingById} from '../../../../logic/store/building/building.selector';

export class BuildingContainer extends Container {
    public scrollViewer: ScrollViewer;
    public buildingHeaderContainer: BuildingHeaderContainer;
    public buildingScopesStackPanel: BuildingScopesStackPanel;

    private buildingState: BuildingState = selectBuildingById(logic().selectedBuildingService.selectedBuildingId$.value);

    constructor() {
        super('buildingContainer');
    }

    public onCreate(): void {
        super.onCreate();
        this.scrollViewer = new ScrollViewer('sectorsScrollViewer');
        this.buildingHeaderContainer = new BuildingHeaderContainer(this.buildingState);
        this.buildingScopesStackPanel = new BuildingScopesStackPanel(this.buildingState);
    }

    public onBuild(): void {
        this.addControlToContainer(this.scrollViewer);
        this.addControlToContainer(this.buildingHeaderContainer);
        this.scrollViewer.addControlToScrollViewer(this.buildingScopesStackPanel);
    }

    public onApplyStyles(): void {
        this.control.background = 'rgba(0, 0, 0, 0.4)';
        this.control.width = '60%';
        this.control.height = '65%';
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.control.isPointerBlocker = true;

        this.scrollViewer.control.width = '100%';
        this.scrollViewer.control.top = '10%';
        this.scrollViewer.control.height = '90%';
        this.scrollViewer.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.scrollViewer.control.thickness = 0;
    }
}
