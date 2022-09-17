import * as GUI from 'babylonjs-gui';
import {
    AppendGuiControl
} from '../../../../../../../../core/scene-manager/gui/gui-elements/append-gui-control/append-gui-control';
import {BuildingObjectGuiElement} from './building-object/building-object.gui-element';
import {
    BuildingObjectState
} from '../../../../../../game-logic/store/building/building-scope/building-object/building-object.state';
import {BuildingScopeState} from '../../../../../../game-logic/store/building/building-scope/building-scope.state';
import {GuiControl} from '../../../../../../../../core/scene-manager/gui/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../../core/scene-manager/gui/gui-elements/gui-element';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';

@GuiElement()
export class BuildingScopeObjectsGuiElement implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('sectorObjects');

    @AppendGuiControl() public scrollViewer: GUI.ScrollViewer = new GUI.ScrollViewer('scrollViewer');
    @AppendGuiControl('scrollViewer') public stackPanel: GUI.StackPanel = new GUI.StackPanel('stackPanel');
    @AppendGuiControl('stackPanel') public buildingObject: BuildingObjectGuiElement[] = [];

    constructor(private buildingScope: BuildingScopeState) {
    }

    public gameOnInit(): void {
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.control.width = '95%';
        this.control.height = '100%';
        this.control.left = '5%';

        this.scrollViewer.width = '100%';
        this.scrollViewer.height = '100%';
        this.scrollViewer.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.scrollViewer.thickness = 0;

        this.stackPanel.isVertical = false;

        this.buildingObject = this.buildingScope.objects.map((object: BuildingObjectState) => new BuildingObjectGuiElement(object));
    }
}
