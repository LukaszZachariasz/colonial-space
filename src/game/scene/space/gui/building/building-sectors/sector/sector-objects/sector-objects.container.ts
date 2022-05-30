import * as GUI from 'babylonjs-gui';
import {BuildingObjectState} from '../../../../../../../logic/store/territory/building/building-object.state';
import {
    BuildingScopeSectorState
} from '../../../../../../../logic/store/territory/building/building-scope-sector.state';
import {Container} from '../../../../../../../../engine/gui-manager/container';
import {ObjectContainer} from './object/object.container';

export class SectorObjectsContainer extends Container {
    private scrollViewer: GUI.ScrollViewer;
    private stackPanel: GUI.StackPanel;

    constructor(private sector: BuildingScopeSectorState) {
        super();
    }


    public render(): GUI.Control {
        this.container = new GUI.Container('sectorObjects');
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.container.width = '95%';
        this.container.height = '100%';
        this.container.left = '5%';

        this.scrollViewer = new GUI.ScrollViewer('scrollViewer');
        this.scrollViewer.width = '100%';
        this.scrollViewer.height = '100%';
        this.scrollViewer.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.scrollViewer.thickness = 0;

        this.stackPanel = new GUI.StackPanel('stackPanel');
        this.stackPanel.isVertical = false;
        this.sector.objects.forEach((object: BuildingObjectState) => {
            this.stackPanel.addControl(new ObjectContainer(object).render());
        });

        this.scrollViewer.addControl(this.stackPanel);
        this.container.addControl(this.scrollViewer);

        return this.container;
    }
}
