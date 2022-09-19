import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../../../core/module/scene/gui/gui-component/append-gui-control/append-gui-control';
import {BuildingScopeNameGuiComponent} from './building-scope-name/building-scope-name.gui-component';
import {BuildingScopeObjectsGuiComponent} from './building-scope-objects/building-scope-objects.gui-component';
import {BuildingScopeState} from '../../../../../game-logic/store/building/building-scope/building-scope.state';
import {GuiComponent} from '@colonial-space/core/module/scene/gui/gui-component/gui-component';
import {GuiControl} from '../../../../../../../core/module/scene/gui/gui-component/gui-control';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';

@GuiComponent()
export class BuildingScopeGuiComponent implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('sector');

    @AppendGuiControl() public buildingScopeName: BuildingScopeNameGuiComponent = new BuildingScopeNameGuiComponent(this.scopeState);
    @AppendGuiControl() public buildingScopeObjects: BuildingScopeObjectsGuiComponent = new BuildingScopeObjectsGuiComponent(this.scopeState);

    constructor(private scopeState: BuildingScopeState) {
    }

    public gameOnInit(): void {
        this.control.width = '100%';
        this.control.height = '160px';
    }
}
