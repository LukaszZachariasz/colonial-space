import * as GUI from 'babylonjs-gui';
import {
    AppendGuiControl
} from '../../../../../../core/scene-manager/gui/gui-elements/append-gui-control/append-gui-control';
import {BuildingScopeGuiElement} from './building-scope/building-scope.gui-element';
import {BuildingScopeState} from '../../../../game-logic/store/building/building-scope/building-scope.state';
import {BuildingState} from '../../../../game-logic/store/building/building.state';
import {GuiControl} from '../../../../../../core/scene-manager/gui/gui-elements/gui-control';
import {GuiElement} from '../../../../../../core/scene-manager/gui/gui-elements/gui-element';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';

@GuiElement()
export class BuildingScopesGuiElement implements GuiControl<GUI.StackPanel>, OnInit {
    public control: GUI.StackPanel = new GUI.StackPanel('sectorsStackPanel');

    @AppendGuiControl() public buildingScope: BuildingScopeGuiElement[] = [];

    constructor(private buildingState: BuildingState) {
    }

    public gameOnInit(): void {
        this.buildingState.scopes.forEach((scope: BuildingScopeState) => {
            this.buildingScope.push(new BuildingScopeGuiElement(scope));
        });
    }
}
