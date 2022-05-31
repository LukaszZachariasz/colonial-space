import * as GUI from 'babylonjs-gui';
import {BuildingHeaderContainer} from './building-header/building-header.container';
import {BuildingScopesStackPanel} from './building-scopes/building-scopes.stack-panel';
import {BuildingState} from '../../../../logic/store/building/building.state';
import {Container} from '../../../../../engine/gui-manager/container';
import {logic} from '../../../../game';
import {selectBuildingById} from '../../../../logic/store/building/building.selector';

export class BuildingContainer extends Container {
    public scrollViewer: GUI.ScrollViewer;

    private buildingState: BuildingState = selectBuildingById(logic().selectedBuildingService.selectedBuildingId$.value);

    public render(): GUI.Control {
        this.container = new GUI.Container('buildingContainer');
        this.container.background = 'rgba(0, 0, 0, 0.4)';
        this.container.width = '60%';
        this.container.height = '65%';
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.container.isPointerBlocker = true;

        this.container.addControl(new BuildingHeaderContainer(this.buildingState).render());

        this.scrollViewer = new GUI.ScrollViewer('sectorsScrollViewer');
        this.scrollViewer.width = '100%';
        this.scrollViewer.top = '10%';
        this.scrollViewer.height = '90%';
        this.scrollViewer.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.scrollViewer.addControl(new BuildingScopesStackPanel(this.buildingState).render());
        this.scrollViewer.thickness = 0;

        this.container.addControl(this.scrollViewer);

        return this.container;
    }
}
