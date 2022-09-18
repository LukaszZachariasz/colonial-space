import * as GUI from 'babylonjs-gui';
import {AppendGuiControl} from '../../../../../../../../core/module/scene/gui/gui-elements/append-gui-control/append-gui-control';
import {BuildingScopeState} from '../../../../../../game-logic/store/building/building-scope/building-scope.state';
import {GuiControl} from '../../../../../../../../core/module/scene/gui/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../../core/module/scene/gui/gui-elements/gui-element';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {TextGuiElement} from '../../../../shared/text/text.gui-element';

@GuiElement()
export class BuildingScopeNameGuiElement implements GuiControl<GUI.Container>, OnInit {
    public control: GUI.Container = new GUI.Container('sectorNameContainer');
    
    @AppendGuiControl() public text: TextGuiElement = new TextGuiElement(this.scopeState.name);

    constructor(private scopeState: BuildingScopeState) {
    }

    public gameOnInit(): void {
        this.control.width = '5%';
        this.control.height = '100%';
        this.control.background = 'rgba(255, 0, 0, 0.4)';
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.text.control.rotation = -Math.PI / 2;
    }
}
