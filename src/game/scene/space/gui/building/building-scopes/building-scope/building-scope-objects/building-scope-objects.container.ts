import * as GUI from 'babylonjs-gui';
import {BuildingObjectContainer} from './building-object/building-object.container';
import {
    BuildingObjectState
} from '../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {BuildingScopeState} from '../../../../../../../logic/store/building/building-scope/building-scope.state';
import {Container} from '../../../../../../../../engine/gui-manager/gui-elements/container';
import {ScrollViewer} from '../../../../../../../../engine/gui-manager/gui-elements/scroll-viewer';
import {StackPanel} from '../../../../../../../../engine/gui-manager/gui-elements/stack-panel';

export class BuildingScopeObjectsContainer extends Container {
    public buildingObjectContainers: BuildingObjectContainer[] = [];

    private scrollViewer: ScrollViewer;
    private stackPanel: StackPanel;

    constructor(private buildingScope: BuildingScopeState) {
        super('sectorObjects');
    }

    public onCreate(): void {
        super.onCreate();
        this.scrollViewer = new ScrollViewer('scrollViewer');
        this.stackPanel = new StackPanel('stackPanel');
        this.buildingScope.objects.forEach((object: BuildingObjectState) => {
            this.buildingObjectContainers.push(new BuildingObjectContainer(object));
        });
    }

    public onBuild(): void {
        this.addControlToContainer(this.scrollViewer);
        this.scrollViewer.addControlToScrollViewer(this.stackPanel);
        this.buildingObjectContainers.forEach((buildingObjectContainer: BuildingObjectContainer) => this.stackPanel.addControlToStackPanel(buildingObjectContainer));
    }

    public onApplyStyles(): void {
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.control.width = '95%';
        this.control.height = '100%';
        this.control.left = '5%';

        this.scrollViewer.control.width = '100%';
        this.scrollViewer.control.height = '100%';
        this.scrollViewer.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.scrollViewer.control.thickness = 0;

        this.stackPanel.control.isVertical = false;
    }
}
