import * as GUI from 'babylonjs-gui';
import {
    AppendGuiControl
} from '../../../../../../core/module/scene/gui/gui-elements/append-gui-control/append-gui-control';
import {BuildingScopeGuiElement} from './building-scope/building-scope.gui-element';
import {BuildingScopeState} from '../../../../game-logic/store/building/building-scope/building-scope.state';
import {BuildingState} from '../../../../game-logic/store/building/building.state';
import {GuiControl} from '../../../../../../core/module/scene/gui/gui-elements/gui-control';
import {GuiElement} from '../../../../../../core/module/scene/gui/gui-elements/gui-element';

@GuiElement()
export class BuildingScopesGuiElement implements GuiControl<GUI.StackPanel> {
    public control: GUI.StackPanel = new GUI.StackPanel('sectorsStackPanel');

    @AppendGuiControl() public buildingScope: BuildingScopeGuiElement[] = this.buildingState.scopes.map((el:BuildingScopeState) => new BuildingScopeGuiElement(el));

    constructor(private buildingState: BuildingState) {
    }
}
