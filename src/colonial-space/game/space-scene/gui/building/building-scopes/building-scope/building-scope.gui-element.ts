import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../../../core/scene-manager/gui/gui-elements/append-gui-control/append-gui-control';
import {BuildingScopeNameGuiElement} from './building-scope-name/building-scope-name.gui-element';
import {BuildingScopeObjectsGuiElement} from './building-scope-objects/building-scope-objects.gui-element';
import {BuildingScopeState} from '../../../../../game-logic/store/building/building-scope/building-scope.state';
import {GuiControl} from '../../../../../../../core/scene-manager/gui/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../core/scene-manager/gui/gui-elements/gui-element';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';

@GuiElement()
export class BuildingScopeGuiElement implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('sector');

    @AppendGuiControl() public buildingScopeName: BuildingScopeNameGuiElement = new BuildingScopeNameGuiElement(this.scopeState);
    @AppendGuiControl() public buildingScopeObjects: BuildingScopeObjectsGuiElement = new BuildingScopeObjectsGuiElement(this.scopeState);

    constructor(private scopeState: BuildingScopeState) {
    }

    public gameOnInit(): void {
        this.control.width = '100%';
        this.control.height = '160px';
    }
}
