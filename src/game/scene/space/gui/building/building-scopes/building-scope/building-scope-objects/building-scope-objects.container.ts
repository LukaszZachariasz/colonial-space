import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../../engine/lifecycle/after-created/after-created';
import {BuildingObjectContainer} from './building-object/building-object.container';
import {
    BuildingObjectState
} from '../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {BuildingScopeState} from '../../../../../../../logic/store/building/building-scope/building-scope.state';
import {GuiContainer} from '../../../../../../../../engine/gui-manager/gui-elements/advanced-controls/gui-container/gui-container';
import {GuiElement} from '../../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {ScrollViewerGui} from '../../../../../../../../engine/gui-manager/gui-elements/advanced-controls/scroll-viewer/scroll-viewer-gui';
import {StackPanel} from '../../../../../../../../engine/gui-manager/gui-elements/advanced-controls/stack-panel/stack-panel';
import {StackPanelGui} from '../../../../../../../../engine/gui-manager/gui-elements/advanced-controls/stack-panel/stack-panel-gui';

@GuiElement()
export class BuildingScopeObjectsContainer extends GuiContainer implements AfterCreated {
    public buildingObjectContainers: BuildingObjectContainer[] = [];

    private scrollViewer: ScrollViewerGui;
    private stackPanel: StackPanel;

    constructor(private buildingScope: BuildingScopeState) {
        super('sectorObjects');
    }

    public gameAfterCreated(): void {
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.control.width = '95%';
        this.control.height = '100%';
        this.control.left = '5%';

        this.scrollViewer = new ScrollViewerGui('scrollViewer');
        this.scrollViewer.control.width = '100%';
        this.scrollViewer.control.height = '100%';
        this.scrollViewer.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.scrollViewer.control.thickness = 0;

        this.stackPanel = new StackPanelGui('stackPanel');
        this.stackPanel.control.isVertical = false;

        this.buildingScope.objects.forEach((object: BuildingObjectState) => {
            this.buildingObjectContainers.push(new BuildingObjectContainer(object));
        });

        this.addControlToContainer(this.scrollViewer);
        this.scrollViewer.addControlToScrollViewer(this.stackPanel);
        this.buildingObjectContainers.forEach((buildingObjectContainer: BuildingObjectContainer) => this.stackPanel.addControlToStackPanel(buildingObjectContainer));
    }
}
