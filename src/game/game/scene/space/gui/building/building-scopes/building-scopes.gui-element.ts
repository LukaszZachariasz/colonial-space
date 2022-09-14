import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../core/lifecycle/after-created/after-created';
import {
    AppendGuiControl
} from '../../../../../../core/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {BuildingScopeGuiElement} from './building-scope/building-scope.gui-element';
import {BuildingScopeState} from '../../../../../logic/store/building/building-scope/building-scope.state';
import {BuildingState} from '../../../../../logic/store/building/building.state';
import {GuiControl} from '../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../core/gui-manager/gui-elements/gui-element';

@GuiElement()
export class BuildingScopesGuiElement implements GuiControl<GUI.StackPanel>, AfterCreated {
    public control: GUI.StackPanel = new GUI.StackPanel('sectorsStackPanel');

    @AppendGuiControl() public buildingScope: BuildingScopeGuiElement[] = [];

    constructor(private buildingState: BuildingState) {
    }

    public gameAfterCreated(): void {
        this.buildingState.scopes.forEach((scope: BuildingScopeState) => {
            this.buildingScope.push(new BuildingScopeGuiElement(scope));
        });
    }
}
