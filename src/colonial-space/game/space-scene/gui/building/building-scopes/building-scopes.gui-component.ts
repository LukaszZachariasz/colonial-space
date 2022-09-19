import * as GUI from 'babylonjs-gui';
import {
    AppendGuiControl
} from '../../../../../../core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {BuildingScopeGuiComponent} from './building-scope/building-scope.gui-component';
import {BuildingScopeState} from '../../../../game-logic/store/building/building-scope/building-scope.state';
import {BuildingState} from '../../../../game-logic/store/building/building.state';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '../../../../../../core/module/scene/gui/gui-component/gui-control';

@GuiComponent()
export class BuildingScopesGuiComponent implements GuiControl<GUI.StackPanel> {
    public control: GUI.StackPanel = new GUI.StackPanel('sectorsStackPanel');

    @AppendGuiControl() public buildingScope: BuildingScopeGuiComponent[] = this.buildingState.scopes.map((el:BuildingScopeState) => new BuildingScopeGuiComponent(el));

    constructor(private buildingState: BuildingState) {
    }
}
