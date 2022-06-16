import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../../engine/lifecycle/after-created/after-created';
import {
    AppendGuiControl
} from '../../../../../../../../engine/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {BuildingObjectGuiElement} from './building-object/building-object.gui-element';
import {
    BuildingObjectState
} from '../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {BuildingScopeState} from '../../../../../../../logic/store/building/building-scope/building-scope.state';
import {GuiControl} from '../../../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../../engine/gui-manager/gui-elements/gui-element';

@GuiElement()
export class BuildingScopeObjectsGuiElement implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('sectorObjects');

    @AppendGuiControl() public scrollViewer: GUI.ScrollViewer = new GUI.ScrollViewer('scrollViewer');
    @AppendGuiControl({
        parent: 'scrollViewer'
    }) public stackPanel: GUI.StackPanel = new GUI.StackPanel('stackPanel');
    @AppendGuiControl({
        parent: 'stackPanel'
    }) public buildingObject: BuildingObjectGuiElement[] = [];

    constructor(private buildingScope: BuildingScopeState) {
    }

    public gameAfterCreated(): void {
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.control.width = '95%';
        this.control.height = '100%';
        this.control.left = '5%';

        this.scrollViewer.width = '100%';
        this.scrollViewer.height = '100%';
        this.scrollViewer.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.scrollViewer.thickness = 0;

        this.stackPanel.isVertical = false;

        this.buildingScope.objects.forEach((object: BuildingObjectState) => {
            this.buildingObject.push(new BuildingObjectGuiElement(object));
        });
    }
}
